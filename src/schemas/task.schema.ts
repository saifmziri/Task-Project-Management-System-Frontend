import { z } from "zod";
import { TaskPriority, TaskStatus } from "@/types";

export const TaskFormSchema  = z.object({
  task_name: z
    .string()
    .trim()
    .min(3, "Task name must be at least 3 characters.")
    .max(255),

  project_id: z.number().min(1, "Project is required."),

  user_id: z.number().min(1, "User is required."),

  priority: z.enum([TaskPriority.low, TaskPriority.medium, TaskPriority.high]),

  status: z.enum([
    TaskStatus.in_progress,
    TaskStatus.completed,
    TaskStatus.canceled,
  ]),

  due_date: z.string().min(1, "Due date is required."),
});

export type TaskFormData  = z.infer<typeof TaskFormSchema >;
