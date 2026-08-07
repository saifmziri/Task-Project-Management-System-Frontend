import api from "./axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type {
  ApiResponse,
  User,
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
  VerifyEmailRequest,
  ResendVerificationRequest,
  ChangePasswordRequest,
  resetPasswordRequest,
} from "@/types";

// use Arrow function
export const AuthApi = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<LoginData>>(API_ENDPOINTS.AUTH.LOGIN, data),

  register: (data: RegisterRequest) =>
    api.post<ApiResponse<RegisterData>>(API_ENDPOINTS.AUTH.REGISTER, data),

  verifyEmail: (data: VerifyEmailRequest) =>
    api.post<ApiResponse<LoginData>>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data),

  resendVerificationEmail: (data: ResendVerificationRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, data),

  changePassword: (data: ChangePasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),

  logout: () => api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT),

  getCurrentUser: () =>
    api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.CURRENT_USER),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: (data: resetPasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
};
