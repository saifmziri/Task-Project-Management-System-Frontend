import { UserRole } from "./enum/UserRole";

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  status: "active" | "inactive";
  role_ID: UserRole;
}

export interface UpdateUserRequest {
  full_name: string;
  email: string;
  phone_number: string;
}

export interface ChangeUserStatusRequest {
  status: "active" | "inactive";
}

export interface SearchRequest {
  search?: string;
}
