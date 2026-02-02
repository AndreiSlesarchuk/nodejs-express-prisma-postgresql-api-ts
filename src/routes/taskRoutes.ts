import { Router } from 'express';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/TaskController';
import { validate } from '../middleware/validateResource';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Routes for base path /api/tasks
router.route('/')
  .get(getTasks)
  .post(authenticateToken, validate(createTaskSchema), createTask);

// Routes for ID /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .patch(authenticateToken,validate(updateTaskSchema), updateTask)
  .delete(authenticateToken, deleteTask);

export default router;