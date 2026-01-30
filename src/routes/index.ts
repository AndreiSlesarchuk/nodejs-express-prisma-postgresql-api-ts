import { Router } from 'express';
import taskRoutes from './taskRoutes';
import { Request, Response } from 'express';

const router = Router();

// Health check route
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ 
    status: "UP", 
    timestamp: new Date().toISOString() 
  });
});

router.use('/tasks', taskRoutes);

export default router;