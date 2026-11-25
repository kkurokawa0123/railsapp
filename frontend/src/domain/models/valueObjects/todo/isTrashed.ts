import { BaseValueObject } from '@/domain/models/valueObjects/base/baseValueObjext';
import { TRASHED_STATUS, type IsTrashedStatus } from '@/shared/constants/todoFilterType';

type IsTrasheValue = IsTrashedStatus;

export class IsTrashed extends BaseValueObject<IsTrasheValue, 'IsTrashed'> {
  constructor(value: IsTrasheValue) {
    super(value, 'IsTrashed');
  }
  protected validate(value: IsTrasheValue): void {
    if (!Object.values(TRASHED_STATUS).includes(value)) {
      throw new Error('無効なステータスです。');
    }
  }
}
