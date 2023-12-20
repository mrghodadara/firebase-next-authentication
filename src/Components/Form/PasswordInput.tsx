import type { ChangeEventHandler, FocusEventHandler } from 'react';
import React, { useState } from 'react';
import { twJoin } from 'tailwind-merge';

interface PasswordInputProps {
  id?: string;
  value?: string | number;
  handleChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  handleBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  error?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
}

const PasswordInput = ({
  className = '',
  id,
  value,
  handleChange,
  handleBlur,
  placeholder = '',
  label,
}: PasswordInputProps) => {
  const [isShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={isShowPassword ? 'password' : 'text'}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={twJoin(
          'w-full rounded-md border border-gray-300 px-4 py-2.5 font-inter text-base font-normal leading-6 text-black outline-none',
          className
        )}
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute -top-2 left-3 bg-white px-1.5 font-inter text-sm font-medium leading-3 text-black/70"
        >
          Name
        </label>
      )}
    </div>
  );
};

export { PasswordInput };
