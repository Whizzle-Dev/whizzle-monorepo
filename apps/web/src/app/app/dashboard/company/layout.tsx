'use client';
import React from 'react';
import SettingsLayout from '@/components/layout/SettingsLayout';

const sidebarNavItems = [
  {
    title: 'Employees',
    key: 'employees',
    path: '/app/dashboard/company/employees' as const,
  },
  {
    title: 'Teams',
    key: 'teams',
    path: '/app/dashboard/company/teams' as const,
  },
  {
    title: 'Positions',
    key: 'roles',
    path: '/app/dashboard/company/roles' as const,
  },
];

type CompanySettingsProps = {
  children: React.ReactNode;
};
const CompanySettings = ({ children }: CompanySettingsProps) => {
  return (
    <SettingsLayout
      withPath
      sidebarNavItems={sidebarNavItems}
      title="Employees & Teams"
      description="Manage your employees and teams. Create positions and assign them to your employees. Manage employee permissions."
      className="lg:max-w-full"
    >
      {children}
    </SettingsLayout>
  );
};
export default CompanySettings;
