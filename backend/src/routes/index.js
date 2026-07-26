import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      "Sarthi AI Backend API is healthy and operational"
    )
  );
});

// Auth API sub-router
router.use("/auth", authRoutes);

export default router;
