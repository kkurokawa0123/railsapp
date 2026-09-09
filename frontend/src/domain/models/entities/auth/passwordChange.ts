import { Password } from '@/domain/models/valueObjects/auth/password';

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
    return new PasswordChange(currentPassword, newPassword, newPasswordConfirmation);
  }

  // 確認用パスワードと同一であること
  private assertPasswordConfirmationMatches() : void {
    if (!this.newPassword.equals(this.newPasswordConfirmation)) {
      throw new Error('新パスワードと確認用パスワードの値が異なります。再度入力してください');
    }
  }

  toRequestData() {
    return {
      current_password: this.currentPassword.value,
      password: this.newPassword.value,
      password_confirmation: this.newPasswordConfirmation.value,
    };
  }
}
