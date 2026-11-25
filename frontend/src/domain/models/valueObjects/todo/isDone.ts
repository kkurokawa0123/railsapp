import { BaseValueObject } from '@/domain/models/valueObjects/base/baseValueObjext';
import { DONE_STATUS, type IsDoneStatus } from '@/shared/constants/todoFilterType';

type IsDoneValue = IsDoneStatus;

export class IsDone extends BaseValueObject<IsDoneValue, 'IsDone'> {
  constructor(value: IsDoneValue) {
    super(value, 'IsDone');
  }
  protected validate(value: IsDoneValue): void {
    if (!Object.values(DONE_STATUS).includes(value)) {
      throw new Error('無効なステータスです。');
    }
  }
}
