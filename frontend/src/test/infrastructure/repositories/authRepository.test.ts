import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

import { AuthRepository } from '@/infrastructure/repositories/authRepository';

import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

import { UserName } from '@/domain/models/valueObjects/auth/userName';
import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';

import * as api from '@/infrastructure/api/auth/authApiRequest';
import { HTTP_STATUS } from '@/infrastructure/types/api/httpStatus';
import { authStorage } from '@/infrastructure/authStorage/authStorage';

vi.mock('@/infrastructure/api/auth/authApiRequest', () => ({
  requestSignUp: vi.fn(),
  requestSignIn: vi.fn(),
  requestSignOut: vi.fn(),
  requestrFetchValidateToken: vi.fn(),
  requestUpdatePassword: vi.fn(),
}));

vi.mock('@/infrastructure/authStorage/authStorage', () => ({
  authStorage: {
    clear: vi.fn(),
  },
}));

describe('AuthRepository', () => {
  let authRepository: AuthRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    authRepository = new AuthRepository();
  });

  describe('signUp', () => {
    describe('正常系', () => {
      it('サインアップAPIを呼び出して正常に完了できる', async () => {
        const params = SignUp.create(
          new UserName('山田太郎'),
          new Email('test@example.com'),
          new Password('Password123!'),
          new Password('Password123!'),
        );

        vi.mocked(api.requestSignUp).mockResolvedValue({
          status: HTTP_STATUS.OK,
        } as never);

        await expect(authRepository.signUp(params)).resolves.toBeUndefined();

        expect(api.requestSignUp).toHaveBeenCalledTimes(1);
        expect(api.requestSignUp).toHaveBeenCalledWith(params);
      });
    });

    describe('異常系', () => {
      it('APIのステータスが200以外の場合はエラーになる', async () => {
        const params = SignUp.create(
          new UserName('山田太郎'),
          new Email('test@example.com'),
          new Password('Password123!'),
          new Password('Password123!'),
        );

        vi.mocked(api.requestSignUp).mockResolvedValue({
          status: 400,
        } as never);

        await expect(authRepository.signUp(params)).rejects.toThrow('サインアップに失敗しました');
      });

      it('Axiosエラーのmessageを受け取った場合はそのメッセージを返す', async () => {
        const params = SignUp.create(
          new UserName('山田太郎'),
          new Email('test@example.com'),
          new Password('Password123!'),
          new Password('Password123!'),
        );

        const error = new axios.AxiosError('Bad Request');

        error.response = {
          data: {
            message: 'メールアドレスは既に使用されています',
          },
        } as never;

        vi.mocked(api.requestSignUp).mockRejectedValue(error);

        await expect(authRepository.signUp(params)).rejects.toThrow(
          'メールアドレスは既に使用されています',
        );
      });

      it('Axiosエラー以外のエラーはそのまま返す', async () => {
        const params = SignUp.create(
          new UserName('山田太郎'),
          new Email('test@example.com'),
          new Password('Password123!'),
          new Password('Password123!'),
        );

        const error = new Error('予期しないエラー');

        vi.mocked(api.requestSignUp).mockRejectedValue(error);

        await expect(authRepository.signUp(params)).rejects.toThrow('予期しないエラー');
      });
    });
  });

  describe('signIn', () => {
    describe('正常系', () => {
      it('サインインAPIを呼び出してユーザー情報を返せる', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        };

        vi.mocked(api.requestSignIn).mockResolvedValue({
          status: HTTP_STATUS.OK,
          data: {
            data: user,
          },
        } as never);

        const result = await authRepository.signIn(params);

        expect(result).toEqual(user);

        expect(api.requestSignIn).toHaveBeenCalledTimes(1);
        expect(api.requestSignIn).toHaveBeenCalledWith(params);
      });
    });

    describe('異常系', () => {
      it('APIのステータスが200以外の場合はエラーになる', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        vi.mocked(api.requestSignIn).mockResolvedValue({
          status: 401,
        } as never);

        await expect(authRepository.signIn(params)).rejects.toThrow('サインインに失敗しました');
      });

      it('APIレスポンスにユーザー情報がない場合はエラーになる', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        vi.mocked(api.requestSignIn).mockResolvedValue({
          status: HTTP_STATUS.OK,
          data: {
            data: undefined,
          },
        } as never);

        await expect(authRepository.signIn(params)).rejects.toThrow('サインインに失敗しました');
      });

      it('Axiosエラーのmessageを受け取った場合はそのメッセージを返す', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        const error = new axios.AxiosError('Unauthorized');

        error.response = {
          data: {
            message: 'メールアドレスまたはパスワードが正しくありません',
          },
        } as never;

        vi.mocked(api.requestSignIn).mockRejectedValue(error);

        await expect(authRepository.signIn(params)).rejects.toThrow(
          'メールアドレスまたはパスワードが正しくありません',
        );
      });

      it('Axiosエラー以外のエラーはそのまま返す', async () => {
        const params = SignIn.create(new Email('test@example.com'), new Password('Password123!'));

        const error = new Error('予期しないエラー');

        vi.mocked(api.requestSignIn).mockRejectedValue(error);

        await expect(authRepository.signIn(params)).rejects.toThrow('予期しないエラー');
      });
    });
  });

  describe('signOut', () => {
    describe('正常系', () => {
      it('サインアウトAPIを呼び出して正常に完了できる', async () => {
        vi.mocked(api.requestSignOut).mockResolvedValue({
          status: HTTP_STATUS.OK,
        } as never);

        await expect(authRepository.signOut()).resolves.toBeUndefined();

        expect(api.requestSignOut).toHaveBeenCalledTimes(1);
        expect(authStorage.clear).toHaveBeenCalledTimes(1);
      });
    });

    describe('異常系', () => {
      it('APIのステータスが200以外の場合はエラーになる', async () => {
        vi.mocked(api.requestSignOut).mockResolvedValue({
          status: 401,
        } as never);

        await expect(authRepository.signOut()).rejects.toThrow('サインアウトに失敗しました');
      });

      it('APIでエラーが発生してもStorageをクリアする', async () => {
        const error = new Error('サインアウトAPIエラー');

        vi.mocked(api.requestSignOut).mockRejectedValue(error);

        await expect(authRepository.signOut()).rejects.toThrow('サインアウトAPIエラー');

        expect(authStorage.clear).toHaveBeenCalledTimes(1);
      });

      it('Axiosエラーのmessageを受け取った場合はそのメッセージを返す', async () => {
        const error = new axios.AxiosError('Unauthorized');

        error.response = {
          data: {
            message: 'サインアウトに失敗しました',
          },
        } as never;

        vi.mocked(api.requestSignOut).mockRejectedValue(error);

        await expect(authRepository.signOut()).rejects.toThrow('サインアウトに失敗しました');

        expect(authStorage.clear).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getCurrentUser', () => {
    describe('正常系', () => {
      it('現在のユーザー情報を取得して返せる', async () => {
        const authAccount = {
          id: 1,
          email: 'test@example.com',
        };

        vi.mocked(api.requestrFetchValidateToken).mockResolvedValue({
          status: HTTP_STATUS.OK,
          data: {
            data: authAccount,
          },
        } as never);

        const result = await authRepository.getCurrentUser();

        expect(result).toEqual(authAccount);

        expect(api.requestrFetchValidateToken).toHaveBeenCalledTimes(1);
      });

      it('ユーザー情報が存在しない場合はundefinedを返せる', async () => {
        vi.mocked(api.requestrFetchValidateToken).mockResolvedValue({
          status: HTTP_STATUS.OK,
          data: {
            data: undefined,
          },
        } as never);

        const result = await authRepository.getCurrentUser();

        expect(result).toBeUndefined();
      });
    });

    describe('異常系', () => {
      it('APIのステータスが200以外の場合はエラーになる', async () => {
        vi.mocked(api.requestrFetchValidateToken).mockResolvedValue({
          status: 401,
        } as never);

        await expect(authRepository.getCurrentUser()).rejects.toThrow(
          'ユーザー情報の取得に失敗しました',
        );
      });

      it('Axiosエラーのmessageを受け取った場合はそのメッセージを返す', async () => {
        const error = new axios.AxiosError('Unauthorized');

        error.response = {
          data: {
            message: '認証情報が無効です',
          },
        } as never;

        vi.mocked(api.requestrFetchValidateToken).mockRejectedValue(error);

        await expect(authRepository.getCurrentUser()).rejects.toThrow('認証情報が無効です');
      });

      it('Axiosエラー以外のエラーはそのまま返す', async () => {
        const error = new Error('予期しないエラー');

        vi.mocked(api.requestrFetchValidateToken).mockRejectedValue(error);

        await expect(authRepository.getCurrentUser()).rejects.toThrow('予期しないエラー');
      });
    });
  });

  describe('updatePassword', () => {
    describe('正常系', () => {
      it('パスワード更新APIを呼び出して成功メッセージを返せる', async () => {
        const params = PasswordChange.create(
          new Password('Password123'),
          new Password('Password120'),
          new Password('Password120'),
        );

        vi.mocked(api.requestUpdatePassword).mockResolvedValue({
          status: HTTP_STATUS.OK,
          data: {
            message: 'パスワードを更新しました',
          },
        } as never);

        const result = await authRepository.updatePassword(params);

        expect(result).toBe('パスワードを更新しました');

        expect(api.requestUpdatePassword).toHaveBeenCalledTimes(1);

        expect(api.requestUpdatePassword).toHaveBeenCalledWith(params);
      });
    });

    describe('異常系', () => {
      it('APIのステータスが200以外の場合はエラーになる', async () => {
        const params = PasswordChange.create(
          new Password('Password123'),
          new Password('Password120'),
          new Password('Password120'),
        );

        vi.mocked(api.requestUpdatePassword).mockResolvedValue({
          status: 400,
        } as never);

        await expect(authRepository.updatePassword(params)).rejects.toThrow(
          'updatePassword unexpected status',
        );
      });

      it('Axiosエラーのmessageを受け取った場合はそのメッセージを返す', async () => {
        const params = PasswordChange.create(
          new Password('Password123'),
          new Password('Password120'),
          new Password('Password120'),
        );

        const error = new axios.AxiosError('Bad Request');

        error.response = {
          data: {
            message: '現在のパスワードが正しくありません',
          },
        } as never;

        vi.mocked(api.requestUpdatePassword).mockRejectedValue(error);

        await expect(authRepository.updatePassword(params)).rejects.toThrow(
          '現在のパスワードが正しくありません',
        );
      });

      it('Axiosエラー以外のエラーはそのまま返す', async () => {
        const params = PasswordChange.create(
          new Password('Password123'),
          new Password('Password120'),
          new Password('Password120'),
        );

        const error = new Error('予期しないエラー');

        vi.mocked(api.requestUpdatePassword).mockRejectedValue(error);

        await expect(authRepository.updatePassword(params)).rejects.toThrow('予期しないエラー');
      });
    });
  });
});
