import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Имитация проверки пользователя (в будущем тут будет запрос к БД)
  if (username === 'admin' && password === 'admin') {
    const user = { name: username };
    const secret = process.env.JWT_SECRET as string;

    // Генерируем токен на 1 час
    const accessToken = jwt.sign(user, secret, { expiresIn: '1h' });

    return res.json({ 
      message: "Auth successful",
      accessToken 
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
};