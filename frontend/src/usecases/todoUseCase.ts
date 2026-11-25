import type { ITodoRepository } from '@/domain/repositories/todo/itodoRepository';
import type { InputCreateTodo } from '@/shared/inputs/todo';
import { Todo } from '@/domain/models/entities/todo/todo';
import { TodoName } from '@/domain/models/valueObjects/todo/todoName';
import { IsDone } from '@/domain/models/valueObjects/todo/isDone';
import { IsTrashed } from '@/domain/models/valueObjects/todo/isTrashed';
import { UserId } from '@/domain/models/valueObjects/todo/userId';

export class TodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async findTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async createTodo(input: InputCreateTodo): Promise<Todo> {
    // Domainオブジェクトの構築インプット値をエンティティーに変換してサインアップの引数に設定
    const params = Todo.create(
      new TodoName(input.todoName),
      new IsDone(input.isDoneStatus),
      new IsTrashed(input.isTrashedStatus),
      new UserId(input.userId),
    );
    return await this.todoRepository.create(params);
  }
}
