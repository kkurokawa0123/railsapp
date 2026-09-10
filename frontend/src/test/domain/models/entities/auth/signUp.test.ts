import { describe, it, expect } from 'vitest';

import { SignUp } from '@/domain/models/entities/auth/signUp';

import { UserName } from '@/domain/models/valueObjects/auth/userName';
import { Email } from '@/domain/models/valueObjects/auth/email';
import { Password } from '@/domain/models/valueObjects/auth/password';

describe('SignUp', () => {
  describe('正常系', () => {
    it('有効な値でSignUpを生成できる', () => {
      const userName = new UserName('山田太郎');
      const email = new Email('test@example.com');
      const password = new Password('Password123');
      const passwordConfirmation = new Password('Password123');

      const signUp = SignUp.create(userName, email, password, passwordConfirmation);

      expect(signUp).toBeInstanceOf(SignUp);
    });

    it('パスワードと確認用パスワードが同じ値でSignUpを生成できる', () => {
      const userName = new UserName('山田太郎');
      const email = new Email('test@example.com');
      const password = new Password('Password123');
      const passwordConfirmation = new Password('Password123');

      const signUp = SignUp.create(userName, email, password, passwordConfirmation);

      expect(signUp).toBeInstanceOf(SignUp);
    });

    it('リクエスト用のデータに変換できる', () => {
      const userName = new UserName('山田太郎');
      const email = new Email('test@example.com');
      const password = new Password('Password123');
      const passwordConfirmation = new Password('Password123');

      const signUp = SignUp.create(userName, email, password, passwordConfirmation);

      expect(signUp.toRequestData()).toEqual({
        name: '山田太郎',
        email: 'test@example.com',
        password: 'Password123',
        password_confirmation: 'Password123',
      });
    });

    it('確認用パスワードをリクエスト用データに含めない', () => {
      const userName = new UserName('山田太郎');
      const email = new Email('test@example.com');
      const password = new Password('Password123');
      const passwordConfirmation = new Password('Password123');

      const signUp = SignUp.create(userName, email, password, passwordConfirmation);

      expect(signUp.toRequestData()).not.toHaveProperty('passwordConfirmation');
    });
  });

  describe('異常系', () => {
    it('パスワードと確認用パスワードが異なる場合はSignUpを生成できない', () => {
      const userName = new UserName('山田太郎');
      const email = new Email('test@example.com');
      const password = new Password('Password123');
      const passwordConfirmation = new Password('Password124');

      expect(() => SignUp.create(userName, email, password, passwordConfirmation)).toThrow(
        '新パスワードと確認用パスワードの値が異なります。再度入力してください',
      );
    });
  });
});
