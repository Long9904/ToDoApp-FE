import apiClient from "./api";
import type { ApiResult } from "../../types/apiResult";

export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): Promise<ApiResult<T>> {
  try {
    const response = await apiClient.request<ApiResult<T>>({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    return {
      isSuccess: false,
      errors: error.response.data.Errors ?? error.message,
      statusCode: error.response.StatusCode ?? 500,
    };
  }
}
