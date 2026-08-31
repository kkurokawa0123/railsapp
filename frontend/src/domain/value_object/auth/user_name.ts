import { BaseValueObject } from "@/domain/value_object/base/base_value_objext";

type UserNameValue = string;

export class UserName extends BaseValueObject<UserNameValue, "UserName"> {
  constructor(value: UserNameValue) {
    super(value, "UserName");
  }
  protected validate(value: UserNameValue): void {
    if (!value) {
      throw new Error("ユーザ名は入力必須です");
    }
    if (value.length > 20) {
      throw new Error("ユーザ名は20字以内で入力してください");
    }
  }
}
