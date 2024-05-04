import React from 'react';
import { DashboardLayout as DashboardLayoutComponent } from '@/components/layout/DashboardLayout';

type DashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
};

export default DashboardLayout;
