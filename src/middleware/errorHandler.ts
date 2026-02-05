import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.util';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    stack: err.stack, 
    body: req.method !== 'GET' ? req.body : undefined 
  });

  res.status(statusCode).json({
    status: 'error',
    error: err.name || 'InternalServerError',
    message: err.message || 'Something went wrong',
    ...(isDevelopment && { stack: err.stack })
  });
};