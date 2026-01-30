import 'dotenv/config';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import routes from './routes';
import { swaggerDocument } from './swaggerDocs';

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());
app.use(requestLogger);

// --- Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Routes ---
app.use('/api', routes);

// --- Error Handling ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/api-docs`);
});