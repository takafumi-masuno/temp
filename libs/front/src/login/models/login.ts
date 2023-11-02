export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  sessionId?: string;
  detail?: string;
  isFirstTimeLogin?: boolean;
}
