import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosResponse } from 'axios';
import { ApiRequest } from '@/infrastructure/api/apiRequest';

import {
  requestSignUp,
  requestSignIn,
  requestSignOut,
  requestrFetchValidateToken,
  requestUpdatePassword,
} from '@/infrastructure/api/auth/authApiRequest';

import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

import { UserName } from '@/domain/models/valueObjects/auth/userName';
import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';

vi.mock('@/infrastructure/api/apiRequest', () => ({
  ApiRequest: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('authApiRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requestSignUp', () => {
    describe('正常系', () => {
      it('サインアップ用のPOSTリクエストを送信できる', async () => {
        const params = SignUp.create(
          new UserName('山田太郎'),
          new Email('test@example.com'),
          new Password('Password123!'),
          new Password('Password123!'),
        );

        const response: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {
            headers: {},
          },
          data: {
            data: {
              id: 1,
              name: '山田太郎',
              email: 'test@example.com',
            },
          },
        } as AxiosResponse;

        vi.mocked(ApiRequest.post).mockResolvedValue(response);

        const result = await requestSignUp(params);

        expect(result).toEqual(response);

        expect(ApiRequest.post).toHaveBeenCalledTimes(1);

        expect(ApiRequest.post).toHaveBeenCalledWith('auth', {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123!',
          password_confirmation: 'Password123!',
        });
      });
    });
  });

  describe('requestSignIn', () => {
    describe('正常系', () => {
      it('サインイン用のPOSTリクエストを送信できる', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        const response: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {
            headers: {},
          },
          data: {
            data: {
              id: 1,
              name: '山田太郎',
              email: 'test@example.com',
            },
          },
        } as AxiosResponse;

        vi.mocked(ApiRequest.post).mockResolvedValue(response);

        const result = await requestSignIn(params);

        expect(result).toEqual(response);

        expect(ApiRequest.post).toHaveBeenCalledTimes(1);

        expect(ApiRequest.post).toHaveBeenCalledWith('auth/sign_in', {
          email: 'test@example.com',
          password: 'Password123!',
        });
      });
    });
  });

  describe('requestSignOut', () => {
    describe('正常系', () => {
      it('サインアウト用のDELETEリクエストを送信できる', async () => {
        const response: AxiosResponse = {
          status: 200,
          data: {
            data: {
              data: null,
            },
          },
        } as AxiosResponse;

        vi.mocked(ApiRequest.delete).mockResolvedValue(response);

        const result = await requestSignOut();

        expect(result).toEqual(response);

        expect(ApiRequest.delete).toHaveBeenCalledTimes(1);

        expect(ApiRequest.delete).toHaveBeenCalledWith('auth/sign_out');
      });
    });
  });

  describe('requestrFetchValidateToken', () => {
    describe('正常系', () => {
      it('認証済みユーザー取得用のGETリクエストを送信できる', async () => {
        const response = {
          status: 200,
          data: {
            data: {
              id: 1,
              name: '山田太郎',
              email: 'test@example.com',
            },
          },
        } as AxiosResponse;

        vi.mocked(ApiRequest.get).mockResolvedValue(response);

        const result = await requestrFetchValidateToken();

        expect(result).toEqual(response);

        expect(ApiRequest.get).toHaveBeenCalledTimes(1);

        expect(ApiRequest.get).toHaveBeenCalledWith('/auth/validate_token');
      });
    });
  });

  describe('requestUpdatePassword', () => {
    describe('正常系', () => {
      it('パスワード変更用のPUTリクエストを送信できる', async () => {
        const params = PasswordChange.create(
          new Password('Password123'),
          new Password('Password120'),
          new Password('Password120'),
        );

        const response = {
          status: 200,
          data: {
            data: {
              message: 'パスワードを更新しました',
            },
          },
        } as AxiosResponse;
        vi.mocked(ApiRequest.put).mockResolvedValue(response);

        const result = await requestUpdatePassword(params);

        expect(result).toEqual(response);

        expect(ApiRequest.put).toHaveBeenCalledTimes(1);

        expect(ApiRequest.put).toHaveBeenCalledWith('/password', {
          current_password: 'Password123',
          password: 'Password120',
          password_confirmation: 'Password120',
        });
      });
    });
  });
});
