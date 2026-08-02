import type { User } from "@/types";
import { UserRole } from "@/types/enum/UserRole";

const USER_KEY = "user";

export const CurrentUserService = {
  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  isAdmin(): boolean {
    return this.getUser()?.role_ID === UserRole.Admin;
  },

  isEmployee(): boolean {
    return this.getUser()?.role_ID === UserRole.Employee;
  },
};
