import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  useGetCurrentUser,
  useSingUp,
  useSingIn,
  useSingOut,
  useUpdatePassword,
} from '@/queries/hooks/auth/useAuthMutation';

import { container } from '@/infrastructure/di/container';
import { queryKeys } from '@/queries/keys/query_keys';

import type { InputSignUp, InputSignIn, InputChangePassword } from '@/domain/types/input/auth';

import type { User } from '@/domain/types/user';

vi.mock('@/infrastructure/di/container', () => ({
  container: {
    authUseCase: {
      getCurrentUser: vi.fn(),
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      updatePassword: vi.fn(),
    },
  },
}));

describe('Auth React Query Hooks', () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  describe('useGetCurrentUser', () => {
    describe('正常系', () => {
      it('現在ログインしているユーザーを取得できる', async () => {
        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        vi.mocked(container.authUseCase.getCurrentUser).mockResolvedValue(user);

        const { result } = renderHook(() => useGetCurrentUser(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(container.authUseCase.getCurrentUser).toHaveBeenCalledTimes(1);

        expect(result.current.data).toEqual(user);
      });
    });

    describe('異常系', () => {
      it('ユーザー情報の取得に失敗した場合はエラーになる', async () => {
        const error = new Error('ユーザー情報の取得に失敗しました');

        vi.mocked(container.authUseCase.getCurrentUser).mockRejectedValue(error);

        const { result } = renderHook(() => useGetCurrentUser(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toBe(error);
      });
    });
  });

  describe('useSingUp', () => {
    describe('正常系', () => {
      it('サインアップ処理を実行できる', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password123',
        } as InputSignUp;

        vi.mocked(container.authUseCase.signUp).mockResolvedValue(undefined);

        vi.mocked(container.authUseCase.signOut).mockResolvedValue(undefined);

        const { result } = renderHook(() => useSingUp(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync(input);
        });

        expect(container.authUseCase.signUp).toHaveBeenCalledWith(input);
      });

      it('サインアップ成功後にサインアウトを実行する', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password123',
        } as InputSignUp;

        vi.mocked(container.authUseCase.signUp).mockResolvedValue(undefined);

        vi.mocked(container.authUseCase.signOut).mockResolvedValue(undefined);

        const { result } = renderHook(() => useSingUp(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync(input);
        });

        expect(container.authUseCase.signOut).toHaveBeenCalledTimes(1);
      });
    });

    describe('異常系', () => {
      it('サインアップに失敗した場合はエラーになる', async () => {
        const input = {
          name: '山田太郎',
          email: 'test@example.com',
          password: 'Password123',
          passwordConfirmation: 'Password123',
        } as InputSignUp;

        const error = new Error('サインアップに失敗しました');

        vi.mocked(container.authUseCase.signUp).mockRejectedValue(error);

        const { result } = renderHook(() => useSingUp(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync(input);
          }),
        ).rejects.toThrow('サインアップに失敗しました');

        expect(container.authUseCase.signOut).not.toHaveBeenCalled();
      });
    });
  });

  describe('useSingIn', () => {
    describe('正常系', () => {
      it('サインイン処理を実行できる', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123',
        } as InputSignIn;

        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        vi.mocked(container.authUseCase.signIn).mockResolvedValue(user);

        const { result } = renderHook(() => useSingIn(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync(input);
        });

        expect(container.authUseCase.signIn).toHaveBeenCalledWith(input);
      });

      it('サインイン成功後にユーザー情報をキャッシュへ保存する', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123',
        } as InputSignIn;

        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        vi.mocked(container.authUseCase.signIn).mockResolvedValue(user);

        const { result } = renderHook(() => useSingIn(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync(input);
        });

        expect(queryClient.getQueryData(queryKeys.authUser.key)).toEqual(user);
      });
    });

    describe('異常系', () => {
      it('サインインに失敗した場合はエラーになる', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123',
        } as InputSignIn;

        const error = new Error('サインインに失敗しました');

        vi.mocked(container.authUseCase.signIn).mockRejectedValue(error);

        const { result } = renderHook(() => useSingIn(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync(input);
          }),
        ).rejects.toThrow('サインインに失敗しました');
      });

      it('サインインに失敗した場合はユーザー情報を更新しない', async () => {
        const input = {
          email: 'test@example.com',
          password: 'Password123',
        } as InputSignIn;

        const error = new Error('サインインに失敗しました');

        vi.mocked(container.authUseCase.signIn).mockRejectedValue(error);

        const { result } = renderHook(() => useSingIn(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync(input);
          }),
        ).rejects.toThrow();

        expect(queryClient.getQueryData(queryKeys.authUser.key)).toBeUndefined();
      });
    });
  });

  describe('useSingOut', () => {
    describe('正常系', () => {
      it('サインアウト処理を実行できる', async () => {
        vi.mocked(container.authUseCase.signOut).mockResolvedValue(undefined);

        const { result } = renderHook(() => useSingOut(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync();
        });

        expect(container.authUseCase.signOut).toHaveBeenCalledTimes(1);
      });

      it('サインアウト成功後にユーザー情報をnullにする', async () => {
        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        queryClient.setQueryData(queryKeys.authUser.key, user);

        vi.mocked(container.authUseCase.signOut).mockResolvedValue(undefined);

        const { result } = renderHook(() => useSingOut(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync();
        });

        expect(queryClient.getQueryData(queryKeys.authUser.key)).toBeNull();
      });
    });

    describe('異常系', () => {
      it('サインアウトに失敗した場合はエラーになる', async () => {
        const error = new Error('サインアウトに失敗しました');

        vi.mocked(container.authUseCase.signOut).mockRejectedValue(error);

        const { result } = renderHook(() => useSingOut(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync();
          }),
        ).rejects.toThrow('サインアウトに失敗しました');
      });

      it('サインアウトに失敗した場合はユーザー情報を更新しない', async () => {
        const user = {
          id: 1,
          name: '山田太郎',
          email: 'test@example.com',
        } as User;

        queryClient.setQueryData(queryKeys.authUser.key, user);

        const error = new Error('サインアウトに失敗しました');

        vi.mocked(container.authUseCase.signOut).mockRejectedValue(error);

        const { result } = renderHook(() => useSingOut(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync();
          }),
        ).rejects.toThrow();

        expect(queryClient.getQueryData(queryKeys.authUser.key)).toEqual(user);
      });
    });
  });

  describe('useUpdatePassword', () => {
    describe('正常系', () => {
      it('パスワード変更処理を実行できる', async () => {
        const input = {
          currentPassword: 'CurrentPassword123',
          newPassword: 'NewPassword123',
          newPasswordConfirmation: 'NewPassword123',
        } as InputChangePassword;

        const message = 'パスワードを変更しました';

        vi.mocked(container.authUseCase.updatePassword).mockResolvedValue(message);

        const { result } = renderHook(() => useUpdatePassword(), {
          wrapper: createWrapper(),
        });

        await act(async () => {
          await result.current.mutateAsync(input);
        });

        expect(container.authUseCase.updatePassword).toHaveBeenCalledWith(input);
      });

      it('パスワード変更成功時にメッセージを取得できる', async () => {
        const input = {
          currentPassword: 'Password123',
          newPassword: 'Password120',
          newPasswordConfirmation: 'Password120',
        } as InputChangePassword;

        const message = 'パスワードを変更しました';

        vi.mocked(container.authUseCase.updatePassword).mockResolvedValue(message);

        const { result } = renderHook(() => useUpdatePassword(), {
          wrapper: createWrapper(),
        });

        const response = await act(async () => {
          return await result.current.mutateAsync(input);
        });

        expect(response).toBe(message);
      });
    });

    describe('異常系', () => {
      it('パスワード変更に失敗した場合はエラーになる', async () => {
        const input = {
          currentPassword: 'Password120',
          newPassword: 'Password123',
          newPasswordConfirmation: 'Password123',
        } as InputChangePassword;

        const error = new Error('パスワード変更に失敗しました');

        vi.mocked(container.authUseCase.updatePassword).mockRejectedValue(error);

        const { result } = renderHook(() => useUpdatePassword(), {
          wrapper: createWrapper(),
        });

        await expect(
          act(async () => {
            await result.current.mutateAsync(input);
          }),
        ).rejects.toThrow('パスワード変更に失敗しました');
      });
    });
  });
});
