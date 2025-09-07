import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/service/dashboard-service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { PaginationParams } from "@/types/dashboard";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboard,
  });
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();
  const { updateMembership: updateAuthMembership } = useAuthStore();

  return useMutation({
    mutationFn: (packageType: "A" | "B" | "C") =>
      dashboardService.updateMembership(packageType),

    onSuccess: (data, packageType) => {
      updateAuthMembership(packageType);

      // Invalidate dashboard query to refetch with new membership info
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      toast.success(
        `Membership updated to Package ${packageType} successfully!`
      );
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update membership";
      toast.error(errorMessage);
    },
  });
};

export const useVideos = (params: PaginationParams = {}) => {
  const { page = 1, size = 10 } = params;
  
  return useQuery({
    queryKey: ["videos", { page, size }],
    queryFn: () => dashboardService.getVideos(params),
  });
};

export const useArticles = (params: PaginationParams = {}) => {
  const { page = 1, size = 10 } = params;
  
  return useQuery({
    queryKey: ["articles", { page, size }],
    queryFn: () => dashboardService.getArticles(params),
  });
};