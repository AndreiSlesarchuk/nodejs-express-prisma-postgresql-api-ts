import { NextFunction, Request, Response } from 'express';
import { cacheService } from '../services/CacheService';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const { title, description } = req.body;
    const userId = authReq.user.id;
    const newTask = await taskService.createTask(userId, req.body.title, req.body.description);
    await cacheService.delete('tasks:all');
    res.status(201).json(newTask);
  } catch (error) { next(error); }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await cacheService.getOrSet('tasks:all', async () => {
      return taskService.getAllTasks();
    })
    res.json(tasks);
  } catch (error) { next(error); }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const task = await cacheService.getOrSet(`tasks:${id}`, () => 
      taskService.getTaskById(id)
    );
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.updateTask(Number(req.params.id), req.body);
    await cacheService.delete('tasks:all');
    res.json(task);
  } catch (error) { next(error); }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    await cacheService.delete('tasks:all');
    res.status(204).send();
  } catch (error) { next(error); }
};