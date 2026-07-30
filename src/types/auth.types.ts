import type { User } from "./user.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: User;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}

export interface RegisterData {
  user: User;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface resetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
  email: string;
}
