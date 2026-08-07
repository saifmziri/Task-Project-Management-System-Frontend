import { AuthApi } from "../api/auth.api";

import type {
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
  VerifyEmailRequest,
  ResendVerificationRequest,
  ChangePasswordRequest,
  resetPasswordRequest,
  User,
} from "../types/";
import { TokenService } from "./token.service";
import { CurrentUserService } from "./current-user.service";

class AuthService {
  async login(data: LoginRequest, rememberMe: boolean): Promise<LoginData> {
    const response = await AuthApi.login(data);

    const loginData = response.data.data!;

    TokenService.setToken(loginData.token, rememberMe);
    CurrentUserService.setUser(loginData.user);

    return loginData;
  }

  async register(data: RegisterRequest): Promise<RegisterData> {
    const response = await AuthApi.register(data);
    return response.data.data;
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<LoginData> {
    return (await AuthApi.verifyEmail(data)).data.data!;
  }

  async resendVerificationEmail(
    data: ResendVerificationRequest,
  ): Promise<void> {
    await AuthApi.resendVerificationEmail(data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await AuthApi.changePassword(data);

    TokenService.removeToken();
    CurrentUserService.removeUser();
  }

  async forgotPassword(email: string): Promise<void> {
    await AuthApi.forgotPassword(email);
  }

  async resetPassword(data: resetPasswordRequest): Promise<void> {
    await AuthApi.resetPassword(data);
  }

  async logout(): Promise<void> {
    await AuthApi.logout();

    TokenService.removeToken();
    CurrentUserService.removeUser();
  }

  async getCurrentUser(): Promise<User> {
    const response = await AuthApi.getCurrentUser();

    return response.data.data;
  }
}

export default new AuthService();
