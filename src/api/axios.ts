import axios from "axios";
import { TokenService } from "@/services/token.service";
import { CurrentUserService } from "@/services/current-user.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = TokenService.getToken();

  if (token) {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

const LOGIN_PATH = "/login";

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      window.location.pathname !== LOGIN_PATH
    ) {
      TokenService.removeToken();
      CurrentUserService.removeUser();

      window.location.replace(LOGIN_PATH);
    }

    return Promise.reject(error);
  },
);

export default api;
