import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '@/infrastructure/types/api/apiResponse';
import { ApiRequest } from '@/infrastructure/api/apiRequest';

import type { User } from '@/domain/types/user';
import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

// サインアップ（新規アカウント作成）Promise<AxiosResponse<ResponseData>>
export const requestSignUp = async (params: SignUp): Promise<AxiosResponse<ApiResponse<User>>> => {
  return await ApiRequest.post('auth', params.toRequestData());
};

// サインイン（ログイン）Promise<AxiosResponse<ResponseData>>
export const requestSignIn = async (params: SignIn): Promise<AxiosResponse<ApiResponse<User>>> => {
  return await ApiRequest.post('auth/sign_in', params.toRequestData());
};

// サインアウト（ログアウト）: Promise<AxiosResponse<ResponseData>>
export const requestSignOut = async (): Promise<AxiosResponse<ApiResponse<User>>> => {
  return await ApiRequest.delete('auth/sign_out');
};

// 認証済みのユーザーを取得 Promise<AxiosResponse<ResponseData>>
export const requestrFetchValidateToken = async () => {
  return await ApiRequest.get<ApiResponse<User>>('/auth/validate_token');
};

// パスワード変更
export const requestUpdatePassword = async (params: PasswordChange) => {
  return await ApiRequest.put('/password', params.toRequestData());
};
