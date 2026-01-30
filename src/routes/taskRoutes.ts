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

const router = Router();

// Routes for base path /api/tasks
router.route('/')
  .get(getTasks)
  .post(validate(createTaskSchema), createTask);

// Routes for ID /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .patch(validate(updateTaskSchema), updateTask)
  .delete(deleteTask);

export default router;