import { Report } from "../models/report.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AGENT_MICROSERVICE_URL =
  process.env.AGENT_MICROSERVICE_URL || "http://127.0.0.1:8000/api/agents/run";

/**
 * Execute Python multi-agent pipeline directly via child process
 */
function executePythonAgents(query) {
  return new Promise((resolve, reject) => {
    // Check possible script paths (backend/finalAgents/run_pipeline.py or root finalAgents/run_pipeline.py)
    let scriptPath = path.resolve(__dirname, "../../finalAgents/run_pipeline.py");
    if (!fs.existsSync(scriptPath)) {
      scriptPath = path.resolve(__dirname, "../../../finalAgents/run_pipeline.py");
    }

    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    console.log(`[Workflow Controller] Executing Python agent pipeline via child process: ${scriptPath}`);

    const child = spawn(pythonCmd, [scriptPath, JSON.stringify({ query })], {
      cwd: path.dirname(scriptPath)
    });

    let stdoutData = "";
    let stderrData = "";

    child.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        console.error(`[Workflow Controller] Python process exited with code ${code}:`, stderrData);
        return reject(new Error(`Python agent script failed with code ${code}: ${stderrData}`));
      }
      try {
        const parsed = JSON.parse(stdoutData.trim());
        resolve(parsed);
      } catch (err) {
        console.error("[Workflow Controller] Failed to parse JSON from Python stdout:", stdoutData);
        reject(new Error("Invalid JSON output from Python agent process"));
      }
    });

    child.on("error", (err) => {
      console.error("[Workflow Controller] Failed to spawn Python process:", err);
      reject(err);
    });
  });
}

/**
 * @desc    Execute multi-agent workflow query & save report
 * @route   POST /api/v1/workflow/run  or  GET /api/v1/workflow/run?query=...
 * @access  Public (Guest) or Private (If Authorization token provided)
 */
export const runAgentWorkflow = asyncHandler(async (req, res) => {
  const query = req.body?.query || req.query?.query;

  if (!query || !query.trim()) {
    if (req.method === "GET") {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            service: "Sarthi AI Workflow Engine API",
            status: "online",
            usage: {
              post: "POST /api/v1/workflow/run with JSON body { 'query': 'your research topic' }",
              get: "GET /api/v1/workflow/run?query=your+research+topic"
            }
          },
          "Sarthi AI Agent Workflow endpoint ready"
        )
      );
    }
    throw new ApiError(400, "Query string is required");
  }

  let agentResponseData;

  try {
    console.log(`[Workflow Controller] Calling HTTP Agent Microservice at: ${AGENT_MICROSERVICE_URL}`);
    const agentResponse = await fetch(AGENT_MICROSERVICE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query.trim() }),
    });

    if (!agentResponse.ok) {
      const errorText = await agentResponse.text();
      console.error("Agent microservice returned error status:", agentResponse.status, errorText);
      throw new Error(`Agent service responded with status ${agentResponse.status}`);
    }

    agentResponseData = await agentResponse.json();
    console.log("[Workflow Controller] Received successful response from HTTP Agent microservice.");
  } catch (err) {
    console.warn(`[Workflow Controller] Could not reach HTTP Agent microservice (${AGENT_MICROSERVICE_URL}): ${err.message}`);
    console.log("[Workflow Controller] Attempting dynamic Python child process execution fallback...");

    try {
      agentResponseData = await executePythonAgents(query.trim());
      console.log("[Workflow Controller] Dynamic Python agent pipeline executed successfully.");
    } catch (pyErr) {
      console.error("[Workflow Controller] Direct Python execution also failed:", pyErr.message);
      throw new ApiError(500, `Multi-agent processing failed: ${pyErr.message}`);
    }
  }

  let responseData = {
    query: query.trim(),
    taskType: agentResponseData.taskType || "research",
    plan: agentResponseData.plan || {},
    analysis: agentResponseData.analysis || "",
    recommendations: agentResponseData.recommendations || "",
    report: agentResponseData.report || "",
    sources: agentResponseData.sources || [],
  };

  // Persist report in MongoDB if user is authenticated
  if (req.user && req.user._id) {
    const savedReport = await Report.create({
      user: req.user._id,
      ...responseData
    });
    responseData = savedReport;
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      responseData,
      "Multi-agent research workflow completed successfully"
    )
  );
});

/**
 * @desc    Get search & report history for current logged-in user
 * @route   GET /api/v1/workflow/reports
 * @access  Private (Protected by verifyJWT)
 */
export const getUserReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, reports, "User reports retrieved successfully")
  );
});

/**
 * @desc    Get single report by ID
 * @route   GET /api/v1/workflow/reports/:id
 * @access  Private (Protected by verifyJWT)
 */
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(200, report, "Report details retrieved successfully")
  );
});

/**
 * @desc    Delete report by ID
 * @route   DELETE /api/v1/workflow/reports/:id
 * @access  Private (Protected by verifyJWT)
 */
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Report deleted successfully")
  );
});
