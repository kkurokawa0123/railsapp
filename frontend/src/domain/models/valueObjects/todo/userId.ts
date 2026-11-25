import { BaseValueObject } from '@/domain/models/valueObjects/base/baseValueObjext';

type UserIdValue = number;

export class UserId extends BaseValueObject<UserIdValue, 'UserId'> {
  constructor(value: UserIdValue) {
    super(value, 'UserId');
  }
  protected validate(value: UserIdValue): void {
    if (!value) {
      throw new Error('ユーザー情報が取得できません');
    }
  }
}
