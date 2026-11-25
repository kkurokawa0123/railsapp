import axios from 'axios';

import * as api from '@/infrastructure/api/todo/todoApiRequest';
import { HTTP_STATUS } from '@/infrastructure/types/api/httpStatus';

import type { Todo } from '@/domain/models/entities/todo/todo';
import type { ITodoRepository } from '@/domain/repositories/todo/itodoRepository';

export class TodoRepository implements ITodoRepository {
  async findAll(): Promise<Todo[]> {
    try {
      const response = await api.requestFetchTodosById();
      if (response.status !== HTTP_STATUS.OK) {
        throw new Error('Todo一覧の取得に失敗しました');
      }
      const todos = response.data.data as Todo[];
      return todos;
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'Todo一覧の取得に失敗しました';
        throw new Error(message);
      } else {
        throw err;
      }
    }
  }
  async create(params: Todo): Promise<Todo> {
    try {
      const response = await api.requestCreateTodo(params);
      if (response.status !== HTTP_STATUS.CREATED) {
        throw new Error('Todoの新規登録に失敗しました');
      }
      return response.data.data as Todo;
    } catch (err: unknown) {
      // APIコントローラーのエラーメッセージを受取
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors?.full_messages?.join(', ') ||
          err.response?.data?.errors?.join(', ') ||
          'Todoの新規登録に失敗しました';
        throw new Error(message);
      } else {
        throw err;
      }
    }
  }
}
