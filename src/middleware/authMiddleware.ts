import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1]; // Извлекаем токен из "Bearer <TOKEN>"
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded; // Сохраняем данные пользователя в запрос
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};