import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PasswordField } from '@/presentation/views/components/PasswordField';
import { useMessageContext } from '@/presentation/contexts/messageContext';
import { useLoadingContext } from '@/presentation/contexts/lodingContext';
import { useAuthContex } from '@/presentation/contexts/authContext';
import { useSingOut } from '@/queries/hooks/auth/useAuthMutation';
import { useUpdatePassword } from '@/queries/hooks/auth/useAuthMutation';

import { SEVERITY } from '@/domain/types/constants/severity';
import { COMMON_ERROR_MESSAGES } from '@/domain/types/constants/commonErrorMessage';

const PasswordChange = () => {
  const navigate = useNavigate();
  const { openLoading, closeLoading } = useLoadingContext();
  const { showMessage } = useMessageContext();
  const { isAuthenticated } = useAuthContex();
  const singOut = useSingOut();
  const updatePassword = useUpdatePassword();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      openLoading();
      showMessage('パスワード変更中....しばらくお待ちください', SEVERITY.INFO);
      const message = await updatePassword.mutateAsync(form);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (message) {
        showMessage(message, SEVERITY.SUCCESS);
      }
      // パスワード変更後は強制的にログアウトする
      await singOut.mutateAsync();
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR;
      showMessage(message, SEVERITY.ERROR);
    } finally {
      closeLoading();
    }
  };

  const isSubmitDisabled =
    !form.currentPassword || !form.newPassword || !form.newPasswordConfirmation;

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">パスワード変更</h1>
        <div className="space-y-4">
          <PasswordField
            name="currentPassword"
            label="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <PasswordField
            name="newPassword"
            label="New Password"
            value={form.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <PasswordField
            name="newPasswordConfirmation"
            label="New Password Confirmation"
            value={form.newPasswordConfirmation}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitDisabled}
          >
            実行
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
