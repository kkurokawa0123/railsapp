import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '@/infrastructure/api/axiosClient';

export class ApiRequest {
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axiosClient.get(url, config);
  }
  static async post<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.post(url, body, config);
  }

  static async put<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.put(url, body, config);
  }

  static async patch(url: string) {
    return await axiosClient.patch(url);
  }

  static async delete(url: string) {
    return await axiosClient.delete(url);
  }
}
