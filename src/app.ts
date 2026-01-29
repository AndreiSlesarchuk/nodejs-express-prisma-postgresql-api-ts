import 'dotenv/config';
import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swaggerDocs'; // Импортируем наш конфиг
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "./controllers/TaskController";
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());
app.use(requestLogger);

// --- Documentation ---
// Передаем swaggerDocument напрямую. Больше никаких ошибок парсинга YAML!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Routes ---
app.route('/api/tasks')
  .get(getTasks)
  .post(createTask);

app.route('/api/tasks/:id')
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// --- Error Handling ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/api-docs`);
});