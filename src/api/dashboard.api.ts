import api from "./axios";

import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type { ApiResponse, DashboardStats } from "@/types";

const DashboardApi = {
  get() {
    return api.get<ApiResponse<DashboardStats>>(API_ENDPOINTS.DASHBOARD);
  },
};

export default DashboardApi;
