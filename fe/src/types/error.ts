export interface ApiErrorResponse {
  content: null;
  message: string;
  errors?: string[];
}

export interface ApiError {
  response?: {
    data?: ApiErrorResponse;
  };
  message?: string;
}
