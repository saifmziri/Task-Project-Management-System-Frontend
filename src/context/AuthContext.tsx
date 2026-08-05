/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { CurrentUserService } from "@/services/current-user.service";
import AuthService from "@/services/auth.service"; // 👈 استيراد AuthService
import type { User, LoginRequest, LoginData } from "@/types";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isEmployee: boolean;
  login: (data: LoginRequest, rememberMe: boolean) => Promise<LoginData>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() =>
    CurrentUserService.getUser(),
  );

  // 1. تسجيل الدخول ينادي الـ AuthService ويحدث الـ State
  const login = async (data: LoginRequest, rememberMe: boolean) => {
    const loginData = await AuthService.login(data, rememberMe);
    setUser(loginData.user);
    return loginData;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const isAdmin = CurrentUserService.isAdmin();
  const isEmployee = CurrentUserService.isEmployee();

  return (
    <AuthContext.Provider value={{ user, isAdmin, isEmployee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
