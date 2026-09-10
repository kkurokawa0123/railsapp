import { AuthUseCase } from '@/usecases/authUseCase';
import { AuthRepository } from '@/infrastructure/repositories/authRepository';

const authRepository = new AuthRepository();

export const container = {
  authUseCase: new AuthUseCase(authRepository),
} as const;
