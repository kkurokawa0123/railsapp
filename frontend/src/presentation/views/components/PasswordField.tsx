import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
};

export const PasswordField = ({
  name,
  label,
  value,
  autoComplete,
  onChange,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete={autoComplete}
          placeholder="At least 8 characters"
          className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="button"
          aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示する'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </button>
      </div>
    </div>
  );
};
