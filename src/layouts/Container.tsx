import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IContainer {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<IContainer> = ({ children, className = '' }) => {
  return (
    <div
      className={twMerge(
        'mx-auto w-full max-w-screen-xl px-5 xl:px-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
