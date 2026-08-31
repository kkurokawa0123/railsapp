import { Email } from "@/domain/value_object/auth/email";
import { Password } from "@/domain/value_object/auth/password";

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

  // get email(): Email {
  //   return this._email;
  // }

  // get password(): Password {
  //   return this._password;
  // }

  toRequestData() {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}
