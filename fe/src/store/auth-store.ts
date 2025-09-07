import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/types/auth";
import { removeAuthCookie, setAuthCookie } from "@/utils/auth-util";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User) => {
        const newState = {
          user,
          isAuthenticated: true,
        };
        set(newState);
        setAuthCookie({ ...get(), ...newState });
      },

      logout: () => {
        const newState = {
          user: null,
          isAuthenticated: false,
        };
        set(newState);
        removeAuthCookie();
      },

      updateMembership: (packageType: 'A' | 'B' | 'C') => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            membership_package: packageType
          };
          
          const newState = {
            user: updatedUser,
            isAuthenticated: true,
          };
          
          set(newState);
          setAuthCookie({ ...get(), ...newState });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);