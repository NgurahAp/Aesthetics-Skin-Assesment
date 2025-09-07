import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await api.get<DashboardResponse>("/dashboard");
    return response.data;
  },
};