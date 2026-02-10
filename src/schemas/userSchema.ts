import { z } from 'zod';

/**
 * Schema for user registration.
 */
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username is too long"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  }),
});

/**
 * Schema for user login.
 */
export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  }),
});