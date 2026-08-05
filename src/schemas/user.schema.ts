import { z } from "zod";

export const userSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(255),

  email: z.email("Please enter a valid email."),

  phone_number: z.string().min(10, "Phone number is too short.").max(20),
});

export type userForm = z.infer<typeof userSchema>;
