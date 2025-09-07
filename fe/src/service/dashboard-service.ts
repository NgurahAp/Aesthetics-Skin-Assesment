import api from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import {
  ArticlesResponse,
  DashboardResponse,
  UpdateMembershipRequest,
  VideosResponse,
} from "@/types/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await api.get<DashboardResponse>("/dashboard");
    return response.data;
  },

  updateMembership: async (
    membership_package: "A" | "B" | "C"
  ): Promise<LoginResponse> => {
    const payload: UpdateMembershipRequest = {
      package: membership_package,
    };

    const response = await api.put<LoginResponse>("/membership", payload);
    return response.data;
  },

  getVideos: async (): Promise<VideosResponse> => {
    const response = await api.get<VideosResponse>("/videos");
    return response.data;
  },
  getArticles: async (): Promise<ArticlesResponse> => {
    const response = await api.get<ArticlesResponse>("/articles");
    return response.data;
  },
};
