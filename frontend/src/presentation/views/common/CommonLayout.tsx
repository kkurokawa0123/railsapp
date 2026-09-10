import React from 'react';
import Header from '@/presentation/views/common/Header';

interface CommonLayoutProps {
  children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex min-h-[80vh] items-center justify-center">{children}</div>
        </div>
      </main>
    </>
  );
};

export default CommonLayout;
