import 'dotenv/config';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger.middleware';
import routes from './routes';
import { swaggerDocument } from './swaggerDocs';
import { apiLimiter } from './middleware/rateLimiter';
import { connectRedis } from './redisClient';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRedis(); // Сначала подключаем Redis
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📖 Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// --- Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Routes ---
app.use('/api', apiLimiter, routes);

// --- Error Handling ---
app.use(errorHandler);

startServer();