import { z } from 'zod';

/**
 * Schema for creating a task. 
 * We expect an object in the body with a title and (optional) description. 
 */
export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(3, "Title must be at least 3 characters long")
      .max(50, "Title is too long"),
    description: z.string().optional(),
    assignees: z.array(z.number()).optional(),
  }),
});

/**
 * Schema for updating a task. 
 * There are no required fields, but if they exist, they must be valid
 */
export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"), 
  }),
});