import type { ChangeEvent } from 'react';

type RequiredTextFieldProps = {
  name: string;
  label: string;
  value: string;
  type?: 'text' | 'email';
  placeholder?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RequiredTextField = ({
  name,
  label,
  value,
  type = 'text',
  placeholder,
  autoComplete,
  onChange,
}: RequiredTextFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};
