'use client';
import SettingsLayout, {
  SideBarNavItem,
} from '@/components/layout/SettingsLayout';
import * as React from 'react';
import { useCheckInsData } from '@/domain/check-in/hooks/useCheckInsData';
import { SetupCheckInsView } from '@/domain/check-in/SetupCheckInsView';
import { usePermissions } from '@/domain/employees/usePermissions';
import { PermissionRoleEnum } from '@/generated';
import { Loader } from '@/components/ui/loader';

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const { isSetup, loading } = useCheckInsData();

  const { permissionCheck } = usePermissions();
  const sidebarNavItems: SideBarNavItem[] = [
    {
      title: 'My Check-ins',
      key: 'current',
      path: '/app/dashboard/check-in/submissions/current',
    },
    {
      title: 'Previous Check-ins',
      key: 'previous',
      path: '/app/dashboard/check-in/submissions/previous',
    },
  ];
  if (permissionCheck(PermissionRoleEnum.MANAGER)) {
    sidebarNavItems.push({
      title: 'Company Check-ins',
      key: 'team',
      path: '/app/dashboard/check-in/submissions/team',
    });
  }
  if (loading) {
    return <Loader />;
  }
  if (!isSetup && !loading) {
    return <SetupCheckInsView />;
  }
  return (
    <>
      <SettingsLayout
        sidebarNavItems={sidebarNavItems}
        title="Check-ins"
        withPath
      >
        {children}
      </SettingsLayout>
    </>
  );
}

export default Layout;
