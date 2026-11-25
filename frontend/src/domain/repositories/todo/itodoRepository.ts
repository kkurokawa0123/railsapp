import { Todo } from '@/domain/models/entities/todo/todo';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  create(params: Todo): Promise<Todo>;
}
