import DashboardApi from "@/api/dashboard.api";

import type { DashboardStats } from "@/types";

const DashboardService = {
  async get(): Promise<DashboardStats> {
    const response = await DashboardApi.get();

    return response.data.data;
  },
};

export default DashboardService;
