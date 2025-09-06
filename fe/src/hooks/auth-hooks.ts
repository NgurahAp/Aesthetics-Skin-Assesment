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
      login(data.data);

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

export const useGoogleLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.initiateGoogleLogin,
    onSuccess: (data: any) => {
      if (data.user) {
        login(data.user);
        toast.success(data.message || "Google login successful!");
        const redirectTo = searchParams.get("redirect") || "/todo";
        router.push(redirectTo);
      }
    },
    onError: (error: Error) => {
      console.error("Google login error:", error);

      if (error.message === "Login cancelled") {
        return;
      }

      if (error.message.includes("Popup blocked")) {
        toast.error("Please allow popups and try again");
      } else {
        toast.error(error.message || "Google login failed");
      }
    },
  });
};

export const useFacebookLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.initiateFacebookLogin,
    onSuccess: (data: any) => {
      if (data.user) {
        login(data.user);
        toast.success(data.message || "Facebook login successful!");
        const redirectTo = searchParams.get("redirect") || "/todo";
        router.push(redirectTo);
      }
    },
    onError: (error: Error) => {
      console.error("Facebook login error:", error);

      if (error.message === "Login cancelled") {
        return;
      }

      if (error.message.includes("Popup blocked")) {
        toast.error("Please allow popups and try again");
      } else {
        toast.error(error.message || "Facebook login failed");
      }
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
      toast.success(data.message || "Register successful!");

      const redirectTo = searchParams.get("redirect") || "/";
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
