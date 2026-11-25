import { type IsDoneStatus } from '@/shared/constants/todoFilterType';
import { type IsTrashedStatus } from '@/shared/constants/todoFilterType';

export interface InputCreateTodo {
  todoName: string;
  isDoneStatus: IsDoneStatus;
  isTrashedStatus: IsTrashedStatus;
  userId: number;
}
