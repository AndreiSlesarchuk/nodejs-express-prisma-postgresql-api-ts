import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const newTask = await taskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (error) { next(error); }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) { next(error); }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskById(Number(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.updateTask(Number(req.params.id), req.body);
    res.json(task);
  } catch (error) { next(error); }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    res.status(204).send();
  } catch (error) { next(error); }
};