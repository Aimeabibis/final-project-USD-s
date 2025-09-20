// src/api/apiClient.ts
import api from "./interceptor";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiClient<TRequest = unknown, TResponse = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest
): Promise<TResponse> {
  const response = await api.request<TResponse>({
    method,
    url,
    data,
  });
  return response.data;
}
