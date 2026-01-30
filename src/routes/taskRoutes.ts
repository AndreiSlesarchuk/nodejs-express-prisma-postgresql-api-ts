import { Router } from 'express';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/TaskController';

const router = Router();

// Routes for base path /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// Routes for ID /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask);

export default router;