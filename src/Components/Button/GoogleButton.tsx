import React, { useState } from 'react';

import { signInWithGoogle } from '@/Database/Index';

import { GoogleIcon } from '../Icons/GoogleIcon';
import { Spinner } from '../Loader/Spinner';
import { Button } from './Index';

interface GoogleButtonProps {
  type?: 'SIGN-IN' | 'SIGN-UP';
}

const GoogleButton = ({ type }: GoogleButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = () => {
    setIsLoading(true);

    signInWithGoogle()
      .then(async (_response) => {
        // Data added to firestore using existing function
      })
      .catch((error) => {
        console.log('error', error);
        // switch (error.code) {
        //   case 'auth/invalid-email':
        //     setFieldError('email', 'Invalid email address.');
        //     break;
        //   case 'auth/user-disabled':
        //     setFieldError('email', 'User account is disabled.');
        //     break;
        //   case 'auth/invalid-credential':
        //     setLoginError('Please check email or password');
        //     break;
        //   default:
        //     console.error(error.code);
        // }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={() => handleSignInWithGoogle()}
      className="flex w-full items-center justify-center gap-3 border border-gray-10 bg-white text-gray-5 shadow-sm transition-colors"
    >
      {isLoading ? (
        <Spinner stroke="#D0D7DE" />
      ) : (
        <>
          <GoogleIcon />
          {type === 'SIGN-IN' ? 'Sign in with Google' : 'Sign up with Google'}
        </>
      )}
    </Button>
  );
};

export { GoogleButton };
