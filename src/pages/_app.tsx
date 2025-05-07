import '../styles/global.css';

import type { AppProps } from 'next/app';

import { AuthProvider } from '@/context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
);

export default MyApp;
