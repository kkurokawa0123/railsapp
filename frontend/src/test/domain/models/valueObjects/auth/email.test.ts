import { describe, it, expect } from 'vitest'
import { Email } from '@/domain/models/valueObjects/auth/email'

describe('Email', () => {
  describe('正常系', () => {
    it('有効なEメールアドレスを生成できる', () => {
      const email = new Email('test@example.com')

      expect(email.value).toBe('test@example.com')
    })

    it('40文字のEメールアドレスを生成できる', () => {
      // 40文字
      const value = 'a'.repeat(28) + '@example.com'

      expect(value.length).toBe(40)

      const email = new Email(value)

      expect(email.value).toBe(value)
    })

    it('@を含むEメールアドレスを生成できる', () => {
      const email = new Email('test@example.com')

      expect(email.value).toBe('test@example.com')
    })

    it('.を含むEメールアドレスを生成できる', () => {
      const email = new Email('test@example.com')

      expect(email.value).toBe('test@example.com')
    })

    it('空白を含まないEメールアドレスを生成できる', () => {
      const email = new Email('test@example.com')

      expect(email.value).toBe('test@example.com')
    })

    it('同じ値を持つEmailは等価である', () => {
      const email = new Email('test@example.com')
      const email2 = new Email('test@example.com')

      expect(email.equals(email2)).toBe(true)
    })
  })

  describe('異常系', () => {
    it('空文字は生成できない', () => {
      expect(() => new Email('')).toThrow(
        'Eメールアドレスは入力必須です',
      )
    })

    it('@を含まないEメールアドレスは生成できない', () => {
      expect(() => new Email('testexample.com')).toThrow(
        'Eメールアドレスの入力形式が不正です',
      )
    })

    it('.を含まないEメールアドレスは生成できない', () => {
      expect(() => new Email('test@examplecom')).toThrow(
        'Eメールアドレスの入力形式が不正です',
      )
    })

    it('空白を含むEメールアドレスは生成できない', () => {
      expect(() => new Email('test @example.com')).toThrow(
        'Eメールアドレスの入力形式が不正です',
      )
    })

    it('ローカル部がないEメールアドレスは生成できない', () => {
      expect(() => new Email('@example.com')).toThrow(
        'Eメールアドレスの入力形式が不正です',
      )
    })

    it('ドメイン部がないEメールアドレスは生成できない', () => {
      expect(() => new Email('test@')).toThrow(
        'Eメールアドレスの入力形式が不正です',
      )
    })

    it('41文字以上のEメールアドレスは生成できない', () => {
      const value = 'a'.repeat(29) + '@example.com'

      expect(value.length).toBe(41)

      expect(() => new Email(value)).toThrow(
        'Eメールアドレスは40字以内で入力してください',
      )
    })
  })
})



