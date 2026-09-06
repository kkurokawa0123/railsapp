import type { User } from '@/domain/types/user';
import type { AuthAccount } from '@/domain/types/authAccount';
import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

export interface IAuthRepository {
  // signUp(params: SignUp): Promise<User | undefined>;
  signUp(params: SignUp): Promise<void>;
  signIn(params: SignIn): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthAccount | undefined>;
  updatePassword(params: PasswordChange): Promise<string>;
}
