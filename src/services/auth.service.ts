import { AuthApi } from "../api/auth.api";

import type {
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
  VerifyEmailRequest,
  ResendVerificationRequest,
  ChangePasswordRequest,
} from "../types/auth.types";
import { TokenService } from "./token.service";

class AuthService {
  async login(data: LoginRequest): Promise<LoginData> {
    const response = await AuthApi.login(data);

    const loginData = response.data.data;
    TokenService.setToken(loginData.token);

    return loginData;
  }

  async register(data: RegisterRequest): Promise<RegisterData> {
    const response = await AuthApi.register(data);

    return response.data.data;
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<LoginData> {
    const response = await AuthApi.verifyEmail(data);

    const loginData = response.data.data;

    TokenService.setToken(loginData.token);

    return loginData;
  }

  async resendVerificationEmail(
    data: ResendVerificationRequest,
  ): Promise<void> {
    await AuthApi.resendVerificationEmail(data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await AuthApi.changePassword(data);
  }

  async logout(): Promise<void> {
    await AuthApi.logout();

    TokenService.removeToken();
  }

  async getCurrentUser() {
    const response = await AuthApi.getCurrentUser();

    return response.data.data;
  }
}

export default new AuthService();
