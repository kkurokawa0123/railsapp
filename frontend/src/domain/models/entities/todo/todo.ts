import { TodoName } from '@/domain/models/valueObjects/todo/todoName';
import { IsDone } from '@/domain/models/valueObjects/todo/isDone';
import { IsTrashed } from '@/domain/models/valueObjects/todo/isTrashed';
import { UserId } from '@/domain/models/valueObjects/todo/userId';

export class Todo {
  private constructor(
    private todoName: TodoName,
    private isDone: IsDone,
    private isTrashed: IsTrashed,
    private readonly userId: UserId,
  ) {}

  // 新規エンティティの生成
  static create(todoName: TodoName, isDone: IsDone, isTrashed: IsTrashed, userId: UserId) {
    return new Todo(todoName, isDone, isTrashed, userId);
  }

  // Todo名称の変更
  public changeTodoName(newTodoName: TodoName) {
    this.todoName = newTodoName;
  }

  // 完了フラグの更新
  public changeIsDone(newIsDone: IsDone) {
    this.isDone = newIsDone;
  }

  // 完了フラグの更新
  public changeIsTrashed(newIsTrashed: IsTrashed) {
    this.isTrashed = newIsTrashed;
  }

  toRequestCreateData() {
    return {
      name: this.todoName.value,
      user_id: this.userId.value,
    };
  }
  toRequestUpdateData(id: number) {
    return {
      id: id,
      name: this.todoName.value,
      is_done: this.isDone.value,
      is_trashed: this.isTrashed.value,
      user_id: this.userId.value,
    };
  }
}
