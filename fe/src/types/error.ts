export interface ApiErrorResponse {
  message: string;
}

export interface ApiError {
  response?: {
    data?: ApiErrorResponse;
  };
  message?: string;
}
