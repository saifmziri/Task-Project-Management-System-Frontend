import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters.")
    .max(255),

  description: z.string().trim().min(3, "Description is required.").max(1000),

  start_date: z.string().min(1, "Start date is required."),

  due_date: z.string().min(1, "Due date is required."),
});

export type ProjectData = z.infer<typeof projectSchema>;
