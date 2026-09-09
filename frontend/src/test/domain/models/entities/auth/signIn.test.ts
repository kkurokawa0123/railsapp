
import { describe, it, expect } from 'vitest'

import { SignIn } from '@/domain/models/entities/auth/signIn'

import { Email } from '@/domain/models/valueObjects/auth/email'
import { Password } from '@/domain/models/valueObjects/auth/password'

describe('SignIn', () => {

  describe('正常系', () => {

    it('有効な値でSignInを生成できる', () => {

      const email = new Email('test@example.com')
      const password = new Password('Password123')

      const signIn = SignIn.create(
        email,
        password,
      )

      expect(signIn).toBeInstanceOf(SignIn)

    })

    it('リクエスト用のデータに変換できる', () => {

      const email = new Email('test@example.com')
      const password = new Password('Password123')

      const signIn = SignIn.create(
        email,
        password,
      )

      expect(signIn.toRequestData()).toEqual({
        email: 'test@example.com',
        password: 'Password123',
      })

    })

  })

  // describe('異常系', () => {

  //   // EmailとPasswordのバリデーションは
  //   // それぞれのValue Objectで担保するため、
  //   // SignIn Entityでは異常系のテストは不要。

  // })

})

