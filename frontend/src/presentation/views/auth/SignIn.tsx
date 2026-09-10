import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { PasswordField } from '@/presentation/views/components/PasswordField';

import { useLoadingContext } from '@/presentation/contexts/lodingContext';
import { useMessageContext } from '@/presentation/contexts/messageContext';
import { useAuthContex } from '@/presentation/contexts/authContext';
import { useSingIn } from '@/queries/hooks/auth/useAuthMutation';
import { SEVERITY } from '@/domain/types/constants/severity';
import { COMMON_ERROR_MESSAGES } from '@/domain/types/constants/commonErrorMessage';

const SignIn: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const singIn = useSingIn();
  const { isAuthenticated } = useAuthContex();
  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      openLoading();
      showMessage('ログインしています....しばらくお待ちください', SEVERITY.INFO);
      await singIn.mutateAsync(form);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate('/');
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR;
      showMessage(message, SEVERITY.ERROR);
    } finally {
      closeLoading();
    }
  };

  return (
    <form className="flex min-h-screen items-center justify-center" onSubmit={handleSubmit}>
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold">ログイン</h2>
        </div>
        <div className="space-y-4 p-6">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <PasswordField
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={!form.email || !form.password}
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            実行
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              会員登録がお済みでない場合&nbsp;
              <Link to="/signup" className="text-blue-600 hover:underline">
                会員登録はこちら
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
