import api from "@/lib/axios";
import { LoginFormData, RegisterFormData } from "@/lib/validation";
import { LoginResponse } from "@/types/auth";

export const authService = {
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<LoginResponse> => {
    const transformedData = {
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    const response = await api.post<LoginResponse>(
      "/register",
      transformedData
    );
    return response.data;
  },

  initiateGoogleLogin: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const popup = window.open(
        `${API_BASE_URL}/api/auth/google`,
        "googleLogin",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup) {
        reject(new Error("Popup blocked. Please allow popups for this site."));
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          reject(new Error("Login cancelled"));
        }
      }, 1000);

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== API_BASE_URL) return;

        clearInterval(checkClosed);
        window.removeEventListener("message", messageListener);

        if (event.data.success) {
          popup.close();
          resolve(event.data);
        } else {
          popup.close();
          reject(new Error(event.data.error || "Google login failed"));
        }
      };

      window.addEventListener("message", messageListener);
    });
  },

  initiateFacebookLogin: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const popup = window.open(
        `${API_BASE_URL}/api/auth/facebook`,
        "facbebookLogin",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup) {
        reject(new Error("Popup blocked. Please allow popups for this site."));
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          reject(new Error("Login cancelled"));
        }
      }, 1000);

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== API_BASE_URL) return;

        clearInterval(checkClosed);
        window.removeEventListener("message", messageListener);

        if (event.data.success) {
          popup.close();
          resolve(event.data);
        } else {
          popup.close();
          reject(new Error(event.data.error || "Facebook login failed"));
        }
      };

      window.addEventListener("message", messageListener);
    });
  },
};
