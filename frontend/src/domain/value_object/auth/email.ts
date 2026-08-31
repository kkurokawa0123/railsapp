import { BaseValueObject } from "@/domain/value_object/base/base_value_objext";

type EmailValue = string;
export class Email extends BaseValueObject<EmailValue, "Email"> {
  constructor(value: EmailValue) {
    super(value, "Email");
  }
  protected validate(value: EmailValue): void {
    if (!value) {
      throw new Error("Eメールアドレスは入力必須です");
    }
    // @ がある . がある 空白がないのチェック
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Eメールアドレスの入力形式が不正です");
    }
  }
}
