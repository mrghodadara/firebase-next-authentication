import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-center font-inter text-base font-medium leading-6 text-white shadow-input disabled:opacity-80',
        props?.className
      )}
    >
      {props?.children}
    </button>
  );
};

export { Button };
