import { UserName } from '@/domain/models/valueObjects/auth/userName';
import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';

export class SignUp {
  private constructor(
    private readonly userName: UserName,
    private readonly email: Email,
    private readonly password: Password,
    private readonly passwordConfirmation: Password,
  ) {
    this.assertPasswordConfirmationMatches();
  }

  // 新規エンティティの生成
  static create(
    userName: UserName,
    email: Email,
    password: Password,
    passwordConfirmation: Password,
  ) {
    return new SignUp(userName, email, password, passwordConfirmation);
  }

  // 確認用パスワードと同一であること
  private assertPasswordConfirmationMatches(): void {
    if (!this.password.equals(this.passwordConfirmation)) {
      throw new Error('新パスワードと確認用パスワードの値が異なります。再度入力してください');
    }
  }
  toRequestData() {
    return {
      name: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value,
    };
  }
}
