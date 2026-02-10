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

    // Cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,                       // Safe from robbers from JS (XSS).
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS on prod.
      sameSite: 'strict',                   // Safe from CSRF.
      maxAge: 3600000                       // Time to live 1 hour (in ms)
    });
    // ------------------------

    return res.json({ 
      message: "Auth successful",
      accessToken 
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
};

// Clear the cookie to log out the user
export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  return res.json({ message: "Logged out successfully" });
};