import api from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import { DashboardResponse, UpdateMembershipRequest } from "@/types/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await api.get<DashboardResponse>("/dashboard");
    return response.data;
  },

   updateMembership: async (
    membership_package: 'A' | 'B' | 'C'
  ): Promise<LoginResponse> => {
    const payload: UpdateMembershipRequest = {
      package: membership_package
    };
    
    const response = await api.put<LoginResponse>(
      "/membership", 
      payload
    );
    return response.data;
  },
};
