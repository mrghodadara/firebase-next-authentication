import React, { useState } from 'react';

import { signInWithGoogle } from '@/Database/Index';

import { Spinner } from '../Loader/Spinner';
import { Button } from './Index';

const SignInWithGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = () => {
    setIsLoading(true);

    signInWithGoogle()
      .then(async (response) => {
        console.log('response', response);
        // if (response?.user?.uid) {
        // }
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
    >
      {isLoading ? <Spinner stroke="#FFFFFF" /> : 'Sign in with Google'}
    </Button>
  );
};

export { SignInWithGoogleButton };
