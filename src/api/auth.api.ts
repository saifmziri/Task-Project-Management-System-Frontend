import api from "./axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type {
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
  VerifyEmailRequest,
  ResendVerificationRequest,
  ChangePasswordRequest,
  resetPasswordRequest,
} from "../types/auth.types";

import type { User } from "@/types/user.types";
import type { ApiResponse } from "@/types/api.types";

export const AuthApi = {
  login: (data: LoginRequest) => {
    return api.post<ApiResponse<LoginData>>(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  register: (data: RegisterRequest) => {
    return api.post<ApiResponse<RegisterData>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
  },

  verifyEmail: (data: VerifyEmailRequest) => {
    return api.post<ApiResponse<LoginData>>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      data,
    );
  },

  resendVerificationEmail: (data: ResendVerificationRequest) => {
    return api.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      data,
    );
  },

  changePassword: (data: ChangePasswordRequest) => {
    return api.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data,
    );
  },

  logout: () => {
    return api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getCurrentUser: () => {
    return api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.CURRENT_USER);
  },

  forgotPassword: (email: string) => {
    return api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
  },

  resetPassword: (data: resetPasswordRequest) => {
    return api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};
