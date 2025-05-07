import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Spinner } from '@/Components/Loader/Spinner';

import { useAuth } from '../context/AuthContext';

const publicRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithPublic = (props: P) => {
    const router = useRouter();

    const { user, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && user) {
        router.push('/');
      }
    }, [user, isLoading]);

    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPublic;
};

export default publicRoute;
