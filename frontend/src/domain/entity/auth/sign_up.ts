import { UserName } from "@/domain/value_object/auth/user_name";
import { Email } from "@/domain/value_object/auth/email";
import { Password } from "@/domain/value_object/auth/password";

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

  // get userName(): UserName {
  //   return this._userName;
  // }

  // get email(): Email {
  //   return this._email;
  // }

  // get password(): Password {
  //   return this._password;
  // }

  // get passwordConfirmation(): Password {
  //   return this._password_confirmation;
  // }

  // 確認用パスワードと同一であること
  private assertPasswordConfirmationMatches(): void {
    if (!this.password.equals(this.passwordConfirmation)) {
      throw new Error(
        "新パスワードと確認用パスワードの値が異なります。再度入力してください",
      );
    }
  }
  toRequestData() {
    return {
      name: this.userName.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
