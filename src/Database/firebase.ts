// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGF6kk_oUIlRGntb7Crg1T8TDVUaaxmVA',
  authDomain: 'fir-next-authentication.firebaseapp.com',
  projectId: 'fir-next-authentication',
  storageBucket: 'fir-next-authentication.appspot.com',
  messagingSenderId: '636454307303',
  appId: '1:636454307303:web:03fa1fbaa0a762c517a942',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export { auth, database };
