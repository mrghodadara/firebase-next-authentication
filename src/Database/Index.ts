import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase';

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const signInWithEmail = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};
