import type { LoginType, RegisterType } from "@/types/authType";
import { apiRequest } from "../api/apiRequest";
import type { ApiResult } from "../../types/apiResult";

export async function register(data: RegisterType): Promise<ApiResult<any>> {
  return apiRequest<any>("POST", "/authentication/register", data);
}

export async function login(data: LoginType): Promise<ApiResult<any>> {
  return apiRequest<any>("POST", "/authentication/login", data);
}

export async function loginWithGoogle(token: string): Promise<ApiResult<any>> {
  return apiRequest<any>("POST", "/authentication/login-google", { token });
}
