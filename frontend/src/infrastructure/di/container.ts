import { AuthUseCase } from '@/usecases/authUseCase';
import { AuthRepository } from '@/infrastructure/repositories/authRepository';

import { TodoUseCase } from '@/usecases/todoUseCase';
import { TodoRepository } from '@/infrastructure/repositories/todoRepository';

const authRepository = new AuthRepository();
const todoRepository = new TodoRepository();

export const container = {
  authUseCase: new AuthUseCase(authRepository),
  todoUseCase: new TodoUseCase(todoRepository),
} as const;
