import api from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import {
  ArticlesResponse,
  DashboardResponse,
  UpdateMembershipRequest,
  VideosResponse,
  PaginationParams,
  DetailVideoResponse,
  DetailArticleResponse,
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

  getVideos: async (params: PaginationParams = {}): Promise<VideosResponse> => {
    const { page = 1, size = 10 } = params;
    const queryParams = new URLSearchParams();

    queryParams.append("page", page.toString());
    if (size !== 10) {
      queryParams.append("size", size.toString());
    }

    const response = await api.get<VideosResponse>(
      `/videos?${queryParams.toString()}`
    );
    return response.data;
  },

  getArticles: async (
    params: PaginationParams = {}
  ): Promise<ArticlesResponse> => {
    const { page = 1, size = 10 } = params;
    const queryParams = new URLSearchParams();

    queryParams.append("page", page.toString());
    if (size !== 10) {
      queryParams.append("size", size.toString());
    }

    const response = await api.get<ArticlesResponse>(
      `/articles?${queryParams.toString()}`
    );
    return response.data;
  },

  // New: Get video detail
  getVideoDetail: async (id: string): Promise<DetailVideoResponse> => {
    const response = await api.get<DetailVideoResponse>(`/videos/${id}`);
    return response.data;
  },

  // New: Get article detail
  getArticleDetail: async (id: string): Promise<DetailArticleResponse> => {
    const response = await api.get<DetailArticleResponse>(`/articles/${id}`);
    return response.data;
  },
};
