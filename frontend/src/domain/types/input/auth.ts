export interface InputSignUp {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface InputSignIn {
  email: string;
  password: string;
}

export interface InputChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
