export interface ApiErrorResponse {
  errors: string;
}

export interface ApiError {
  response?: {
    data: ApiErrorResponse;
  };
  message?: string;
}
