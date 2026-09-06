import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries/keys/query_keys';
import { container } from '@/infrastructure/di/container';

import type { InputSignUp, InputSignIn, InputChangePassword } from '@/domain/types/input/auth';
import type { User } from '@/domain/types/user';

export const useGetCurrentUser = () => {
  const { authUseCase } = container;
  return useQuery({
    queryKey: queryKeys.authUser.key,
    queryFn: authUseCase.getCurrentUser,
    staleTime: 1000 * 60 * 10,
    // gcTime: 1000 * 60 * 60,
    retry: false,
  });
};

export const useSingUp = () => {
  const { authUseCase } = container;

  return useMutation({
    mutationFn: async (input: InputSignUp) => await authUseCase.signUp(input),
    onSuccess: async () => {
      // DeviseTokenAuthの仕様で、自動ログインが走るため、強制的にサインアウトする
      await authUseCase.signOut();
    },
    onError: (error) => {
      console.error('useAuthMutation fail', error);
    },
  });
};

export const useSingIn = () => {
  const { authUseCase } = container;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InputSignIn) => await authUseCase.signIn(input),
    onSuccess: (user: User) => {
      queryClient.setQueryData(queryKeys.authUser.key, user);
    },
    onError: (error) => {
      console.error('useAuthMutation fail', error);
    },
  });
};

export const useSingOut = () => {
  const { authUseCase } = container;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await authUseCase.signOut(),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.authUser.key, null);
    },
    onError: (error) => {
      console.error('useSingOut fail', error);
    },
  });
};

export const useUpdatePassword = () => {
  const { authUseCase } = container;

  return useMutation({
    mutationFn: async (input: InputChangePassword) => await authUseCase.updatePassword(input),
    onSuccess: (message) => {
      return message;
    },
    onError: (error) => {
      console.error('useUpdatePassword fail', error);
      return error.message;
    },
  });
};
