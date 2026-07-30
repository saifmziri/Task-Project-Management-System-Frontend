export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",

    VERIFY_EMAIL: "/verify-email",
    RESEND_VERIFICATION: "/email/resend-verification",

    CHANGE_PASSWORD: "/user/change-password",

    CURRENT_USER: "/user",
  },

  USERS: {
    LIST: "/users",

    BY_ID: (id: number | string) => `/users/${id}`,

    UPDATE: (id: number | string) => `/users/${id}`,

    CHANGE_STATUS: (id: number | string) => `/users/${id}/status`,
  },

  PROJECTS: {
    LIST: "/Projects",

    CREATE: "/Projects",

    BY_ID: (id: number | string) => `/Projects/${id}`,

    UPDATE: (id: number | string) => `/Projects/${id}`,

    DELETE: (id: number | string) => `/Projects/${id}`,
  },

  TASKS: {
    LIST: "/Tasks",

    CREATE: "/Tasks",

    BY_ID: (id: number | string) => `/Tasks/${id}`,

    UPDATE: (id: number | string) => `/Tasks/${id}`,

    DELETE: (id: number | string) => `/Tasks/${id}`,

    CHANGE_STATUS: (id: number | string) => `/Tasks/${id}/Status`,
  },
} as const;
