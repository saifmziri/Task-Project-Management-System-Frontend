export const ROUTES = {
  ROOT: "/",

  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  PROJECT_DETAILS: "/projects/:id",
  USERS: "/users",
  TASKS: "/tasks",
  PROFILE: "/profile",
} as const;
