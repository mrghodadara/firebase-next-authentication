import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Spinner } from '@/Components/Loader/Spinner';

import { useAuth } from '../context/AuthContext';

const privateRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/registration/sign-in');
      }
    }, [user, isLoading]);

    if (isLoading || !user) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Spinner height={32} width={32} />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default privateRoute;
