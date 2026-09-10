import axios, {
  type AxiosHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { authStorage } from '@/infrastructure/authStorage/authStorage';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 🔥 リクエスト時にトークン付与
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token, client, uid } = authStorage.get();

  if (token && client && uid) {
    config.headers.set('access-token', token);
    config.headers.set('client', client);
    config.headers.set('uid', uid);
  }

  return config;
});

// 🔥 レスポンスでトークン更新
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const headers = response.headers as AxiosHeaders;
    if (headers?.['access-token']) {
      authStorage.set(headers);
    }
    return response;
  },
  (error: AxiosError) => {
    const headers = error.response?.headers as AxiosHeaders;

    // リクエスト送信時サーバー側トークン更新に伴い、error側でもトークン更新する
    if (headers?.['access-token']) {
      authStorage.set(headers);
    }

    if (!error.response) {
      console.error('Network error', error);
    }
    // 401 Unauthorizedならログイン画面へ
    if (error.response?.status === 401) {
      console.error('Unauthorized error', error);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
