import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Imitation of user authentication. (Later it will be a request to the DB)
  if (username === 'admin' && password === 'admin') {
    const user = { name: username };
    const secret = process.env.JWT_SECRET as string;

    // Generate JWT token - duration is 1 hour. 
    const accessToken = jwt.sign(user, secret, { expiresIn: '1h' });

    return res.json({ 
      message: "Auth successful",
      accessToken 
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
};