import type { IAuthRepository } from '@/domain/repositories/auth/iauthRepository';
import { SignUp } from '@/domain/models/entities/auth/signUp';
import { SignIn } from '@/domain/models/entities/auth/signIn';
import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';
import { UserName } from '@/domain/models/valueObjects/auth/userName';
import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';
import type { User } from '@/domain/types/user';
import type { AuthAccount } from '@/domain/types/authAccount';
import type { InputSignUp, InputSignIn, InputChangePassword } from '@/domain/types/input/auth';

export class AuthUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async signUp(input: InputSignUp): Promise<void> {
    // Domainオブジェクトの構築インプット値をエンティティーに変換してサインアップの引数に設定
    const params = SignUp.create(
      new UserName(input.name),
      new Email(input.email),
      new Password(input.password),
      new Password(input.passwordConfirmation),
    );
    return await this.authRepository.signUp(params);
  }

  async signIn(input: InputSignIn): Promise<User> {
    // Domainオブジェクトの構築インプット値をエンティティーに変換してサインアップの引数に設定
    const params = SignIn.create(new Email(input.email), new Password(input.password));
    const user = await this.authRepository.signIn(params);
    if (!user) {
      throw new Error('Sign in failed');
    }
    return user;
  }

  async signOut(): Promise<void> {
    return await this.authRepository.signOut();
  }

  async getCurrentUser(): Promise<AuthAccount | undefined> {
    const authData = await this.authRepository.getCurrentUser();
    return authData;
  }
  async updatePassword(input: InputChangePassword): Promise<string> {
    const params = PasswordChange.create(
      new Password(input.currentPassword),
      new Password(input.newPassword),
      new Password(input.newPasswordConfirmation),
    );
    const result = await this.authRepository.updatePassword(params);
    return result;
  }
}
