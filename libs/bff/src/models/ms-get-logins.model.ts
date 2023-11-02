export interface GetLoginRequest {
  userId: string;
  password: string;
}

export interface GetLoginResponse {
  sessionId?: string;
  detail?: string;
  isFirstTimeLogin?: boolean;
}
