import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters.")
      .max(255),

    email: z.email("Please enter a valid email."),

    phone_number: z.string().min(10, "Phone number is too short.").max(20),

    password: z.string().min(8, "Password must be at least 8 characters."),

    password_confirmation: z.string(),

    role_id: z.number().min(1, "Role is required."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match.",
  });

export const resetPasswordSchema = z
  .object({
    token: z.string(),

    email: z.email("Please enter a valid email address."),

    password: z.string().min(8, "Password must be at least 8 characters."),

    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required."),
});

export const resendVerificationSchema = z.object({
  email: z.email("Please enter a valid email."),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required."),

    new_password: z.string().min(8, "Password must be at least 8 characters."),

    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "Passwords do not match.",
  });

export type LoginForm = z.infer<typeof loginSchema>;

export type RegisterForm = z.infer<typeof registerSchema>;

export type VerifyEmailForm = z.infer<typeof verifyEmailSchema>;

export type ResendVerificationForm = z.infer<typeof resendVerificationSchema>;

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
