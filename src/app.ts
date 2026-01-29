import 'dotenv/config';
import express, { Request, Response } from "express";
import { createTask, getTasks } from "./controllers/TaskController";
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// routes
app.post('/api/tasks', createTask);
app.get('/api/tasks', getTasks);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
