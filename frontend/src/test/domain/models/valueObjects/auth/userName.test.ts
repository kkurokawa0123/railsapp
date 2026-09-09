
import { describe, it, expect } from 'vitest'

import { UserName } from '@/domain/models/valueObjects/auth/userName'

describe('UserName', () => {
  describe('正常系', () => {
    it('ユーザ名を生成できる', () => {
      const userName = new UserName('testUser')

      expect(userName.value).toBe('testUser')
    })

    it('1文字のユーザ名を生成できる', () => {
      const userName = new UserName('A')

      expect(userName.value).toBe('A')
    })

    it('20文字のユーザ名を生成できる', () => {
      const value = 'a'.repeat(20)

      const userName = new UserName(value)

      expect(userName.value).toBe(value)
    })

    it('同じ値を持つUserNameは等価である', () => {
      const userName = new UserName('testUser')
      const userName2 = new UserName('testUser')

      expect(userName.equals(userName2)).toBe(true)
    })
  })

  describe('異常系', () => {
    it('空文字は生成できない', () => {
      expect(() => new UserName('')).toThrow(
        'ユーザ名は入力必須です',
      )
    })

    it('21文字以上のユーザ名は生成できない', () => {
      const value = 'a'.repeat(21)

      expect(() => new UserName(value)).toThrow(
        'ユーザ名は20字以内で入力してください',
      )
    })
  })
})

