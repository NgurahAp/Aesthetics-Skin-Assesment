import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambah token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.session_key;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout jika unauthorized
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
