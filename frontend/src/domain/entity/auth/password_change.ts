import { Password } from "@/domain/value_object/auth/password";

export class PasswordChange {
  private constructor(
    private readonly currentPassword: Password,
    private readonly newPassword: Password,
    private readonly newPasswordConfirmation: Password,
  ) {
    this.assertPasswordConfirmationMatches();
  }

  static create(
    currentPassword: Password,
    newPassword: Password,
    newPasswordConfirmation: Password,
  ) {
    return new PasswordChange(
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    );
  }

  // 確認用パスワードと同一であること
  assertPasswordConfirmationMatches() {
    if (!this.newPassword.equals(this.newPasswordConfirmation)) {
      throw new Error(
        "新パスワードと確認用パスワードの値が異なります。再度入力してください",
      );
    }
  }

  // get currentPassword(): Password {
  //   return this.current_password;
  // }
  // get newPassword(): Password {
  //   return this.password;
  // }
  // get newPasswordConfirmation(): Password {
  //   return this.password_confirmation;
  // }
  toRequestData() {
    return {
      current_password: this.currentPassword.value,
      password: this.newPassword.value,
      password_confirmation: this.newPasswordConfirmation.value,
    };
  }
}
