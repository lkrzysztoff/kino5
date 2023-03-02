import { UserResponse } from "src/app/core/store/user.interfaces";

export interface AuthResponse {
  accessToken: string;
  user: UserResponse
}

export interface LoginData {
  email: string;
  password: string;
}