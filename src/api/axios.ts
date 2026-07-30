import axios from "axios";
import { TokenService } from "@/services/token.service";

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
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      TokenService.removeToken();

      window.location.replace("/login");
    }

    return Promise.reject(error);
  },
);

export default api;
