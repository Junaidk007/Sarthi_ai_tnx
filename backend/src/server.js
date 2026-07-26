import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const AGENT_PORT = process.env.AGENT_PORT || 8000;

/**
 * Auto-start Python Agent Microservice if available locally
 */
function startAgentServer() {
  let agentServerPath = path.resolve(__dirname, "../finalAgents/agent_server.py");
  if (!fs.existsSync(agentServerPath)) {
    agentServerPath = path.resolve(__dirname, "../../finalAgents/agent_server.py");
  }

  if (!fs.existsSync(agentServerPath)) {
    console.warn("⚠️ agent_server.py not found for background auto-spawn.");
    return;
  }

  const pythonCmd = process.platform === "win32" ? "python" : "python3";
  console.log(`🤖 Auto-starting Python Agent Microservice on port ${AGENT_PORT}...`);

  const agentProcess = spawn(pythonCmd, [agentServerPath], {
    env: { ...process.env, AGENT_PORT: AGENT_PORT.toString() },
    cwd: path.dirname(agentServerPath),
  });

  agentProcess.stdout.on("data", (data) => {
    console.log(`[Python Agent Server]: ${data.toString().trim()}`);
  });

  agentProcess.stderr.on("data", (data) => {
    console.warn(`[Python Agent Server Log]: ${data.toString().trim()}`);
  });

  agentProcess.on("error", (err) => {
    console.warn(`[Python Agent Server Warning]: Failed to auto-spawn daemon: ${err.message}`);
  });
}

// Connect to MongoDB and start Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sarthi AI Headless Backend running on port: ${PORT}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);

      // Attempt background startup of Python Agent Microservice
      startAgentServer();
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database connection: ", err);
    process.exit(1);
  });
