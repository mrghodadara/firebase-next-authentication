import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase';

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return auth.signOut();
};

export const sendForgotPasswordLink = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const createNewPassword = async (
  oobCode: string,
  newPassword: string
) => {
  return confirmPasswordReset(auth, oobCode, newPassword);
};

// verifyPasswordResetCode()
// confirmPasswordReset;
