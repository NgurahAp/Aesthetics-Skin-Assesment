import { AuthState } from "@/types/auth";

export const setAuthCookie = (authData: AuthState) => {
  if (typeof window !== "undefined") {
    const cookieValue = JSON.stringify({ state: authData });
    document.cookie = `auth-storage=${encodeURIComponent(
      cookieValue
    )}; path=/; max-age=86400; SameSite=Strict`;
  }
};

export const removeAuthCookie = () => {
  if (typeof window !== "undefined") {
    document.cookie =
      "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const getAuthFromCookie = (): AuthState | null => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth-storage=")
  );

  if (authCookie) {
    try {
      const cookieValue = authCookie.split("=")[1];
      const decodedValue = decodeURIComponent(cookieValue);
      const authData = JSON.parse(decodedValue);
      return authData.state;
    } catch (error) {
      console.error("Error parsing auth cookie:", error);
    }
  }

  return null;
};
