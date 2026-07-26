import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected auth routes
router.get("/me", verifyJWT, getCurrentUser);
router.patch("/update-profile", verifyJWT, updateProfile);
router.post("/change-password", verifyJWT, changePassword);

export default router;
