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
};
