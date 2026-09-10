import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PasswordField } from '@/presentation/views/components/PasswordField';
import { useLoadingContext } from '@/presentation/contexts/lodingContext';
import { useMessageContext } from '@/presentation/contexts/messageContext';
import { useSingUp } from '@/queries/hooks/auth/useAuthMutation';
import { SEVERITY } from '@/domain/types/constants/severity';
import { COMMON_ERROR_MESSAGES } from '@/domain/types/constants/commonErrorMessage';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const singUp = useSingUp();
  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      openLoading();
      showMessage('ユーザーアカウントを登録しています....しばらくお待ちください', SEVERITY.INFO);
      await singUp.mutateAsync(form);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      showMessage('サインアップが完了しました', SEVERITY.SUCCESS);
      navigate('/signin');
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR;
      showMessage(message, SEVERITY.ERROR);
    } finally {
      closeLoading();
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className="mt-24 flex justify-center px-4"
    >
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">アカウント新規登録</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <PasswordField
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <PasswordField
            name="passwordConfirmation"
            label="Password Confirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
            autoComplete="new-password-confirmation"
          />
          <button
            type="submit"
            disabled={!form.name || !form.email || !form.password || !form.passwordConfirmation}
            className="mt-2 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            登録
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
