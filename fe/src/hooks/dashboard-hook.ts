import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/service/dashboard-service";

export const useDashboard = () => {
  // const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboard,
    // enabled: isAuthenticated,
  });
};
