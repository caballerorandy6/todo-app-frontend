import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.enum(["red", "blue", "green", "yellow", "purple", "pink"]),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Task title must be less than 100 characters")
    .trim()
    .optional(),
  color: z
    .enum(["red", "blue", "green", "yellow", "purple", "pink"])
    .optional(),
  completed: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
