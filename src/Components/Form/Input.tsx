import type { ChangeEventHandler, FocusEventHandler } from 'react';
import React from 'react';
import { twJoin } from 'tailwind-merge';

interface InputProps {
  id?: string;
  value?: string | number;
  handleChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  handleBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  error?: boolean;
  className?: string;
  placeholder?: string;
}

const Input = ({
  className = '',
  id,
  value,
  handleChange,
  handleBlur,
  placeholder = '',
}: InputProps) => {
  return (
    <input
      type="text"
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={twJoin('outline-none', className)}
    />
  );
};

export { Input };
