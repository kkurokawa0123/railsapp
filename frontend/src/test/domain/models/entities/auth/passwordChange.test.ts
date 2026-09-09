import { describe, it, expect } from 'vitest';

import { PasswordChange } from '@/domain/models/entities/auth/passwordChange';

import { Password } from '@/domain/models/valueObjects/auth/password';

describe('PasswordChange', () => {
  describe('正常系', () => {
    it('有効な値でPasswordChangeを生成できる', () => {
      const currentPassword = new Password('Password123');
      const newPassword = new Password('Password120');
      const newPasswordConfirmation = new Password('Password120');

      const passwordChange = PasswordChange.create(
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      );

      expect(passwordChange).toBeInstanceOf(PasswordChange);
    });

    it('新パスワードと確認用パスワードが同じ値でPasswordChangeを生成できる', () => {
      const currentPassword = new Password('Password111');
      const newPassword = new Password('Password222');
      const newPasswordConfirmation = new Password('Password222');

      const passwordChange = PasswordChange.create(
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      );

      expect(passwordChange).toBeInstanceOf(PasswordChange);
    });

    it('リクエスト用のデータに変換できる', () => {
      const currentPassword = new Password('Password111');
      const newPassword = new Password('Password222');
      const newPasswordConfirmation = new Password('Password222');

      const passwordChange = PasswordChange.create(
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      );

      expect(passwordChange.toRequestData()).toEqual({
        current_password: 'Password111',
        password: 'Password222',
        password_confirmation: 'Password222',
      });
    });
  });

  describe('異常系', () => {
    it('新パスワードと確認用パスワードが異なる場合はPasswordChangeを生成できない', () => {
      const currentPassword = new Password('Password222');
      const newPassword = new Password('Password222');
      const newPasswordConfirmation = new Password('Password223');

      expect(() =>
        PasswordChange.create(currentPassword, newPassword, newPasswordConfirmation),
      ).toThrow('新パスワードと確認用パスワードの値が異なります。再度入力してください');
    });
  });
});
