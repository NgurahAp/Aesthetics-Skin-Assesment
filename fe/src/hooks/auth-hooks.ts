import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/service/authService";
import { ApiError } from "@/types/error";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.content.user, data.content.token);

      toast.success(data.message || "Login successful!");

      const redirectTo = searchParams.get("redirect") || "/todo";
      router.push(redirectTo);
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);

      const apiErrorData = error.response?.data;
      let errorMessage = "Login failed. Please try again.";

      if (apiErrorData) {
        if (apiErrorData.errors && apiErrorData.errors.length > 0) {
          errorMessage = apiErrorData.errors[0];
        } else if (apiErrorData.message) {
          errorMessage = apiErrorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.content.user, data.content.token);

      toast.success(data.message || "Register successful!");

      const redirectTo = searchParams.get("redirect") || "/todo";
      router.push(redirectTo);
    },
    onError: (error: ApiError) => {
      console.error("Register error:", error);

      const apiErrorData = error.response?.data;
      let errorMessage = "Register failed. Please try again.";

      if (apiErrorData) {
        if (apiErrorData.errors && apiErrorData.errors.length > 0) {
          errorMessage = apiErrorData.errors[0];
        } else if (apiErrorData.message) {
          errorMessage = apiErrorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return { logout: handleLogout };
};
