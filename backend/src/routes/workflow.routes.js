import { Router } from "express";
import {
  runAgentWorkflow,
  getUserReports,
  getReportById,
  deleteReport,
} from "../controllers/workflow.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protect all workflow routes with JWT authorization
router.use(verifyJWT);

router.post("/run", runAgentWorkflow);
router.get("/reports", getUserReports);
router.get("/reports/:id", getReportById);
router.delete("/reports/:id", deleteReport);

export default router;
