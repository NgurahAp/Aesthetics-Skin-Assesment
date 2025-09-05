import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/types/auth";
import { removeAuthCookie, setAuthCookie } from "@/utils/authUtil";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        const newState = {
          user,
          token,
          isAuthenticated: true,
        };
        set(newState);

        setAuthCookie({ ...get(), ...newState });
      },

      logout: () => {
        const newState = {
          user: null,
          token: null,
          isAuthenticated: false,
        };
        set(newState);

        removeAuthCookie();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
