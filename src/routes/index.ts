import { Router } from 'express';
import taskRoutes from './taskRoutes';
import authRoutes from './authRoutes'; // Импорт новых роутов
import { Request, Response } from 'express';

const router = Router();

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Auth routes (public) 
router.use('/auth', authRoutes);

// Task routes
router.use('/tasks', taskRoutes);

export default router;