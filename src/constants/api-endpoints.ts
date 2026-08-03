export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",

    VERIFY_EMAIL: "/verify-email",
    RESEND_VERIFICATION: "/email/resend-verification",

    CHANGE_PASSWORD: "/user/change-password",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",

    CURRENT_USER: "/user",
  },

  USERS: {
    LIST: "/users",

    BY_ID: (id: number | string) => `/users/${id}`,

    UPDATE: (id: number | string) => `/users/${id}`,

    CHANGE_STATUS: (id: number | string) => `/users/${id}/status`,
  },

  PROJECTS: {
    LIST: "/projects",

    CREATE: "/projects",

    BY_ID: (id: number | string) => `/projects/${id}`,

    UPDATE: (id: number | string) => `/projects/${id}`,

    DELETE: (id: number | string) => `/projects/${id}`,
  },

  TASKS: {
    LIST: "/tasks",

    CREATE: "/tasks",

    BY_ID: (id: number | string) => `/tasks/${id}`,

    UPDATE: (id: number | string) => `/tasks/${id}`,

    DELETE: (id: number | string) => `/tasks/${id}`,

    CHANGE_STATUS: (id: number | string) => `/tasks/${id}/status`,
  },
  DASHBOARD: "/dashboard",
} as const;
