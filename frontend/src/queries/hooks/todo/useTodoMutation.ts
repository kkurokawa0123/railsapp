import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries/keys/query_keys';
import { container } from '@/infrastructure/di/container';

import type { InputCreateTodo } from '@/shared/inputs/todo';

export const useFindTodos = () => {
  const { todoUseCase } = container;

  return useQuery({
    queryKey: queryKeys.todo.key,
    queryFn: todoUseCase.findTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const { todoUseCase } = container;

  return useMutation({
    mutationFn: (todo: InputCreateTodo) => {
      return todoUseCase.createTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.key,
      });
    },
  });
};
