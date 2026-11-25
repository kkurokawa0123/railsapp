import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '@/infrastructure/types/api/apiResponse';
import { ApiRequest } from '@/infrastructure/api/apiRequest';

import type { Todo } from '@/domain/models/entities/todo/todo';

export const requestFetchTodosById = async (): Promise<AxiosResponse<ApiResponse<Todo[]>>> => {
  return ApiRequest.get(`/todos`);
};

export const requestCreateTodo = async (
  params: Todo,
): Promise<AxiosResponse<ApiResponse<Todo>>> => {
  const datas = params.toRequestCreateData();
  return ApiRequest.post(`/todos`, { todo: datas });
};
