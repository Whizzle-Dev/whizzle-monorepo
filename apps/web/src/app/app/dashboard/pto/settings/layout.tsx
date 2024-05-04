'use client';
import React from 'react';
import SettingsLayout from '@/components/layout/SettingsLayout';

const sidebarNavItems = [
  {
    title: 'Vacation Policies',
    key: 'vacation-policies',
    path: '/app/dashboard/pto/settings/vacation-policies' as const,
  },
  {
    title: 'Approval Routing',
    key: 'approval-routing',
    path: '/app/dashboard/pto/settings/approval-routing' as const,
  },
];

type PtoSettingsLayoutProps = {
  children: React.ReactNode;
};
const PtoSettingsLayout = ({ children }: PtoSettingsLayoutProps) => {
  return (
    <SettingsLayout
      withPath
      sidebarNavItems={sidebarNavItems}
      title="PTO Settings"
      description="Manage your company PTO settings. This will affect how your
            employees request time off."
    >
      {children}
    </SettingsLayout>
  );
};
export default PtoSettingsLayout;
