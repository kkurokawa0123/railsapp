import { isEqual } from "lodash";

export abstract class BaseValueObject<T, U> {
  private _type: U;
  protected readonly _value: T;

  constructor(value: T, type: U) {
    this.validate(value);
    this._value = value;
    this._type = type;
  }

  protected abstract validate(value: T): void;

  get value(): T {
    return this._value;
  }

  equals(other: BaseValueObject<T, U>): boolean {
    return isEqual(this.value, other.value);
  }

  get valueType(): U {
    return this._type;
  }
}
