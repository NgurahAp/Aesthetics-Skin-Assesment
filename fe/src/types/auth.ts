export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  session_key: string;
}

export interface LoginResponse {
  data: User;
  message: string;
  errors: string[];
}

// Auth Store State
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
