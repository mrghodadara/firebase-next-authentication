import type { ReactNode } from 'react';

import Header from '@/layouts/Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const Main = (props: IMainProps) => {
  return (
    <div className="w-full font-roboto text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto w-full">
        <Header />
        <main className="text-xl">{props.children}</main>
      </div>
    </div>
  );
};

export { Main };
