import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
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

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
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
