import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';

export class SignIn {
  private constructor(
    private readonly email: Email,
    private readonly password: Password,
  ) {}

  // 新規エンティティの生成
  static create(email: Email, password: Password): SignIn {
    return new SignIn(email, password);
  }

  public delete(): void {
    // 削除時のロジックがあれば書く
  }

  toRequestData() {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}
