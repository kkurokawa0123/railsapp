import { describe, it, expect } from 'vitest';
import { Password } from '@/domain/models/valueObjects/auth/password';

// パスワードはA-Z 、 a-zをそれぞれ1文字以上使用した最大12文字以内
describe('Password', () => {
  describe('正常系', () => {
    it('8文字で生成できる', () => {
      const password = new Password('Password');

      expect(password.value).toBe('Password');
    });

    it('12文字で生成できる', () => {
      const password = new Password('P' + 'a'.repeat(11));

      expect(password.value).toBe('P' + 'a'.repeat(11));
    });

    it('大文字と小文字を含んでいれば生成できる', () => {
      const password = new Password('passwordA');

      expect(password.value).toBe('passwordA');
    });

    it('同じ値を持つPasswordは等価である', () => {
      const password = new Password('Password01');
      const password2 = new Password('Password01');

      expect(password.equals(password2)).toBe(true);
    });
  });

  describe('異常系', () => {
    it('空文字は生成できない', () => {
      expect(() => new Password('')).toThrow('パスワードは入力必須です');
    });

    it('7文字では生成できない', () => {
      expect(() => new Password('P' + 'a'.repeat(6))).toThrow();
    });

    it('13文字では生成できない', () => {
      expect(() => new Password('P' + 'a'.repeat(12))).toThrow();
    });

    it('大文字を含まない場合は生成できない', () => {
      expect(() => new Password('password01')).toThrow();
    });

    it('小文字を含まない場合は生成できない', () => {
      expect(() => new Password('PASSWORD01')).toThrow();
    });
  });
});
