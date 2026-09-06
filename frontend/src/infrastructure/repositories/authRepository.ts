import axios from 'axios';

import type { User } from '@/domain/types/user';
import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import type { IAuthRepository } from '@/domain/repositories/auth/iauthRepository';
import type { AuthAccount } from '@/domain/types/authAccount';

import * as api from '@/infrastructure/api/auth/authApiRequest';
import { HTTP_STATUS } from '@/infrastructure/types/api/httpStatus';
import { authStorage } from '@/infrastructure/authStorage/authStorage';
import type { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

export class AuthRepository implements IAuthRepository {
  async signUp(params: SignUp): Promise<void> {
    try {
      const response = await api.requestSignUp(params);
      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('サインアップに失敗しました');
      }
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'サインアップに失敗しました';
        throw new Error(message, { cause: err });
      } else {
        throw err;
      }
    }
  }

  async signIn(params: SignIn): Promise<User> {
    try {
      const response = await api.requestSignIn(params);
      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('サインインに失敗しました');
      }
      return response.data.data as User;
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'サインインに失敗しました';
        throw new Error(message, { cause: err });
      } else {
        throw err;
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      const response = await api.requestSignOut();
      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('サインアウトに失敗しました');
      }
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'サインアウトに失敗しました';
        throw new Error(message, { cause: err });
      } else {
        throw err;
      }
    } finally {
      authStorage.clear();
    }
  }

  async getCurrentUser(): Promise<AuthAccount | undefined> {
    try {
      const response = await api.requestrFetchValidateToken();
      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('ユーザー情報の取得に失敗しました');
      }
      return response.data.data as AuthAccount;
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'ユーザー情報の取得に失敗しました';
        throw new Error(message, { cause: err });
      } else {
        throw err;
      }
    }
  }

  async updatePassword(params: PasswordChange): Promise<string> {
    try {
      const response = await api.requestUpdatePassword(params);

      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('updatePassword unexpected status');
      }
      return response.data.message as string;
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'パスワード更新に失敗しました';
        throw new Error(message, { cause: err });
      } else {
        throw err;
      }
    }
  }
}
