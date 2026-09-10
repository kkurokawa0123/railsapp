import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AuthUseCase } from '@/usecases/authUseCase';

import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

import type { IAuthRepository } from '@/domain/repositories/auth/iauthRepository';
import type { User } from '@/domain/types/user';
import type { AuthAccount } from '@/domain/types/authAccount';

describe('AuthUseCase', () => {
  let authRepository: IAuthRepository;
  let authUseCase: AuthUseCase;

  beforeEach(() => {
    authRepository = {
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      getCurrentUser: vi.fn(),
      updatePassword: vi.fn(),
    };

    authUseCase = new AuthUseCase(authRepository);
  });

  describe('signUp', () => {
    describe('正常系', () => {
      it('入力値からSignUpエンティティを生成してRepositoryに渡せる', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password123',
        };

        vi.mocked(authRepository.signUp).mockResolvedValue(undefined);

        await authUseCase.signUp(input);

        expect(authRepository.signUp).toHaveBeenCalledTimes(1);

        const params = vi.mocked(authRepository.signUp).mock.calls[0][0];

        expect(params).toBeInstanceOf(SignUp);

        expect(params.toRequestData()).toEqual({
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          password_confirmation: 'Password123',
        });
      });
    });

    describe('異常系', () => {
      it('パスワードと確認用パスワードが異なる場合はRepositoryを呼び出さない', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password120',
        };

        await expect(authUseCase.signUp(input)).rejects.toThrow(
          'パスワードと確認用パスワードの値が異なります。再度入力してください',
        );

        expect(authRepository.signUp).not.toHaveBeenCalled();
      });

      it('Repositoryで発生したエラーをそのまま返す', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password123',
        };

        const error = new Error('サインアップに失敗しました');

        vi.mocked(authRepository.signUp).mockRejectedValue(error);

        await expect(authUseCase.signUp(input)).rejects.toThrow('サインアップに失敗しました');
      });
    });
  });

  describe('signIn', () => {
    describe('正常系', () => {
      it('入力値からSignInエンティティを生成してRepositoryに渡し、ユーザー情報を返せる', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123!',
        };

        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        vi.mocked(authRepository.signIn).mockResolvedValue(user);

        const result = await authUseCase.signIn(input);

        expect(authRepository.signIn).toHaveBeenCalledTimes(1);

        const params = vi.mocked(authRepository.signIn).mock.calls[0][0];

        expect(params).toBeInstanceOf(SignIn);

        expect(params.toRequestData()).toEqual({
          email: 'test@example.com',
          password: 'Password123!',
        });

        expect(result).toEqual(user);
      });
    });

    describe('異常系', () => {
      it('Repositoryで発生したエラーをそのまま返す', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123!',
        };

        const error = new Error('サインインに失敗しました');

        vi.mocked(authRepository.signIn).mockRejectedValue(error);

        await expect(authUseCase.signIn(input)).rejects.toThrow('サインインに失敗しました');
      });
    });
  });

  describe('signOut', () => {
    describe('正常系', () => {
      it('Repositoryのサインアウト処理を呼び出せる', async () => {
        vi.mocked(authRepository.signOut).mockResolvedValue(undefined);

        await authUseCase.signOut();

        expect(authRepository.signOut).toHaveBeenCalledTimes(1);
      });
    });

    describe('異常系', () => {
      it('Repositoryで発生したエラーをそのまま返す', async () => {
        const error = new Error('サインアウトに失敗しました');

        vi.mocked(authRepository.signOut).mockRejectedValue(error);

        await expect(authUseCase.signOut()).rejects.toThrow('サインアウトに失敗しました');
      });
    });
  });

  describe('getCurrentUser', () => {
    describe('正常系', () => {
      it('Repositoryから取得した現在のユーザー情報を返せる', async () => {
        const authAccount = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as AuthAccount;

        vi.mocked(authRepository.getCurrentUser).mockResolvedValue(authAccount);

        const result = await authUseCase.getCurrentUser();

        expect(authRepository.getCurrentUser).toHaveBeenCalledTimes(1);

        expect(result).toEqual(authAccount);
      });

      it('Repositoryからundefinedが返った場合はundefinedを返せる', async () => {
        vi.mocked(authRepository.getCurrentUser).mockResolvedValue(undefined);

        const result = await authUseCase.getCurrentUser();

        expect(result).toBeUndefined();
      });
    });

    describe('異常系', () => {
      it('Repositoryで発生したエラーをそのまま返す', async () => {
        const error = new Error('ユーザー情報の取得に失敗しました');

        vi.mocked(authRepository.getCurrentUser).mockRejectedValue(error);

        await expect(authUseCase.getCurrentUser()).rejects.toThrow(
          'ユーザー情報の取得に失敗しました',
        );
      });
    });
  });

  describe('updatePassword', () => {
    describe('正常系', () => {
      it('入力値からPasswordChangeエンティティを生成してRepositoryに渡し、結果を返せる', async () => {
        const input = {
          currentPassword: 'Password123',
          newPassword: 'Password120',
          newPasswordConfirmation: 'Password120',
        };

        vi.mocked(authRepository.updatePassword).mockResolvedValue('パスワードを更新しました');

        const result = await authUseCase.updatePassword(input);

        expect(authRepository.updatePassword).toHaveBeenCalledTimes(1);

        const params = vi.mocked(authRepository.updatePassword).mock.calls[0][0];

        expect(params).toBeInstanceOf(PasswordChange);

        expect(params.toRequestData()).toEqual({
          current_password: 'Password123',
          password: 'Password120',
          password_confirmation: 'Password120',
        });

        expect(result).toBe('パスワードを更新しました');
      });
    });

    describe('異常系', () => {
      it('新パスワードと確認用パスワードが異なる場合はRepositoryを呼び出さない', async () => {
        const input = {
          currentPassword: 'Password123',
          newPassword: 'Password120',
          newPasswordConfirmation: 'Password121',
        };

        await expect(authUseCase.updatePassword(input)).rejects.toThrow(
          '新パスワードと確認用パスワードの値が異なります。再度入力してください',
        );

        expect(authRepository.updatePassword).not.toHaveBeenCalled();
      });

      it('Repositoryで発生したエラーをそのまま返す', async () => {
        const input = {
          currentPassword: 'Password123',
          newPassword: 'Password120',
          newPasswordConfirmation: 'Password120',
        };

        const error = new Error('パスワード更新に失敗しました');

        vi.mocked(authRepository.updatePassword).mockRejectedValue(error);

        await expect(authUseCase.updatePassword(input)).rejects.toThrow(
          'パスワード更新に失敗しました',
        );
      });
    });
  });
});
