import React from 'react';

import { Button } from '@/Components/Button/Index';
import { useAuth } from '@/context/AuthContext';
import privateRoute from '@/hoc/privateRoute';

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen  flex-col items-center justify-center gap-6">
      <p className="font-inter text-lg font-medium">Hello, {user?.email}</p>
      <Button className="w-32" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default privateRoute(Index);
