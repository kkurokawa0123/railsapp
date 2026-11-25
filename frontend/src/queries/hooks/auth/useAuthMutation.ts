import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries/keys/query_keys';
import { container } from '@/infrastructure/di/container';

import type { InputSignUp, InputSignIn, InputChangePassword } from '@/shared/inputs/auth';
import type { ResponseUserData } from '@/shared/outputs/auth';

export const useGetCurrentUser = () => {
  const { authUseCase } = container;
  return useQuery({
    queryKey: queryKeys.authUser.key,
    queryFn: async () => {
      return await authUseCase.getCurrentUser();
    },
    staleTime: 1000 * 60 * 10,
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
    onError: (error: Error) => {
      console.error(error.name, error.message);
    },
  });
};

export const useSingIn = () => {
  const { authUseCase } = container;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InputSignIn) => await authUseCase.signIn(input),
    onSuccess: (user: ResponseUserData) => {
      queryClient.setQueryData(queryKeys.authUser.key, user);
    },
    onError: (error: Error) => {
      console.error(error.name, error.message);
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
    onError: (error: Error) => {
      console.error(error.name, error.message);
    },
  });
};

export const useUpdatePassword = () => {
  const { authUseCase } = container;

  return useMutation({
    mutationFn: async (input: InputChangePassword) => await authUseCase.updatePassword(input),
    onError: (error: Error) => {
      console.error(error.name, error.message);
      return error.message;
    },
  });
};
