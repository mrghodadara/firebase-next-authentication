import { addDoc, collection } from 'firebase/firestore';

import { database } from './firebase';

const usersRef = collection(database, 'users');

export const createUserInDB = async (data: {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  return addDoc(usersRef, { ...data });
};
