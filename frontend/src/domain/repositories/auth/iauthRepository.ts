import type { ResponseUserData } from '@/shared/outputs/auth';
// import type { AuthAccount } from '@/shared/outputs/authAccount';
import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

export interface IAuthRepository {
  signUp(params: SignUp): Promise<void>;
  signIn(params: SignIn): Promise<ResponseUserData>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<ResponseUserData | undefined>;
  updatePassword(params: PasswordChange): Promise<string>;
}
