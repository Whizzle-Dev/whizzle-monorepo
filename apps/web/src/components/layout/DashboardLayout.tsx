'use client';

import Sidebar from '@/components/Sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className="hidden flex-col md:flex">
        <div className="lg:pl-60">
          <div className="py-8 px-8">{children}</div>
        </div>
      </div>
    </>
  );
};
