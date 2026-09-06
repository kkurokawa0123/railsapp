import { BaseValueObject } from '@/domain/models/valueObjects/base/baseValueObjext';

type PasswordValue = string;

export class Password extends BaseValueObject<PasswordValue, 'Password'> {
  constructor(value: PasswordValue) {
    super(value, 'Password');
  }
  protected validate(value: PasswordValue): void {
    if (!value) {
      throw new Error('パスワードは入力必須です');
    }
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || value.length < 8 || value.length > 12) {
      throw new Error(
        'パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください',
      );
    }
  }
}
