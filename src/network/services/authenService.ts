import type { RegisterType } from "@/types/authType";
import { apiRequest } from "../api/apiRequest";
import type { ApiResult } from "../../types/apiResult";

export async function register(data: RegisterType): Promise<ApiResult<any>> {
  return apiRequest<any>("POST", "/authentication/register", data);
}
