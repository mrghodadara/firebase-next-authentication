import '../styles/global.css';

import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <AuthProvider>
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  </>
);

export default MyApp;
