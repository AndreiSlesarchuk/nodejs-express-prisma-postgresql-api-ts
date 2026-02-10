import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db';

const ACCESS_TOKEN_EXPIRY = '15m'; // Short-lived for security
const REFRESH_TOKEN_EXPIRY = '7d';
const ACCESS_TOKEN_COOKIE_MAX_AGE = 15 * 60 * 1000; // 15 minutes in ms
const REFRESH_TOKEN_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user in DB
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isActive: true 
      }
    });

    res.status(201).json({ 
      message: 'Registration successful', 
      userId: newUser.id 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

/**
 * Login user and provide tokens via cookies
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // 2. Validate credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // 3. Check account status
    if (!user.isActive) {
      return res.status(403).json({ error: "Your account is deactivated" });
    }

    const secret = process.env.JWT_SECRET as string;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string;

    // 4. Generate Tokens
    const accessToken = jwt.sign(
      { id: user.id, username: user.username }, 
      secret, 
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    const refreshToken = jwt.sign(
      { id: user.id }, 
      refreshSecret, 
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // 5. Update Refresh Token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    // 6. Set Cookies
    const cookieOptions = {
      httpOnly: true, // Prevents JS access to cookies
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    res.cookie('accessToken', accessToken, { 
      ...cookieOptions, 
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE 
    });
    
    res.cookie('refreshToken', refreshToken, { 
      ...cookieOptions, 
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE 
    });

    return res.json({ 
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error during login" });
  }
};

/**
 * Handle token refresh
 */
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    // Verify token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: number };

    // Check if token exists in DB for this user
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET!, 
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Update access token cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE
    });

    return res.json({ message: "Token refreshed" });
  } catch (error) {
    return res.status(403).json({ error: "Token expired or invalid" });
  }
};

/**
 * Logout user
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        // Clear token from DB
        const payload = jwt.decode(refreshToken) as { id: number };
        if (payload?.id) {
            await prisma.user.update({
                where: { id: payload.id },
                data: { refreshToken: null }
            });
        }
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error during logout" });
  }
};