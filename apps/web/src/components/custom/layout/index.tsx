import React from 'react';
import { LayoutProps } from './types';
import { Footer, Header } from '@/components/custom';

export function Layout(props: LayoutProps) {
  return (
    <>
      <div className="flex flex-col" style={{ minHeight: '100vh' }}>
        <Header />
        <main className="flex flex-col p-20">{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
