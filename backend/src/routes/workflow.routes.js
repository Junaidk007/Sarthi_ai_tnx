import { Router } from "express";
import {
  runAgentWorkflow,
  getUserReports,
  getReportById,
  deleteReport,
} from "../controllers/workflow.controller.js";
import { verifyJWT, optionalJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Support both POST (JSON body) and GET (query params / health check) for workflow execution
router.post("/run", optionalJWT, runAgentWorkflow);
router.get("/run", optionalJWT, runAgentWorkflow);

// Protected report history management routes
router.get("/reports", verifyJWT, getUserReports);
router.get("/reports/:id", verifyJWT, getReportById);
router.delete("/reports/:id", verifyJWT, deleteReport);

export default router;
