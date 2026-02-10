import { Router } from "express";
import taskRoutes from "./taskRoutes";
import authRoutes from "./authRoutes"; 
import { Request, Response } from "express";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Auth routes (public)
// router.use("/auth", authLimiter, authRoutes);
router.use("/auth", authRoutes);

// Task routes
router.use("/tasks", taskRoutes);

export default router;
