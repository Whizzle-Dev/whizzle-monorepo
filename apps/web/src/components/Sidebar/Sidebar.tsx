'use client';

import React, { useEffect, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { HomeIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Route } from 'nextjs-routes';
import { Icons } from '../ui/icons';
import { emitter } from '@/domain/auth/logoutEvent';
import {
  PermissionRoleEnum,
  useGetCurrentUserQuery,
  useUnreadNotificationsCountQuery,
} from '@/generated';
import { usePermissions } from '@/domain/employees/usePermissions';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/components/Sidebar/NavItem';
import { ProfilePopover } from '@/components/Sidebar/ProfilePopover';

type MenuItem = {
  title: string;
  Icon?: React.ReactComponentElement<any> | React.ComponentType<any> | any;
  path: Route['pathname'];
  permission: PermissionRoleEnum;
};
const menuItems: (MenuItem & {
  children?: MenuItem[];
})[] = [
  {
    title: 'Home',
    Icon: HomeIcon,
    path: '/app/dashboard',
    permission: PermissionRoleEnum.EMPLOYEE,
  },
  {
    title: 'Paid Time Off',
    Icon: Icons.PalmtreeIcon,
    path: '/app/dashboard/pto/request-timeof',
    permission: PermissionRoleEnum.EMPLOYEE,
    children: [
      {
        title: 'Overview',
        path: '/app/dashboard/pto/request-timeof',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
      {
        title: 'Absence Calendar',
        path: '/app/dashboard/pto/absence-calendar',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
      {
        title: 'Company Accruals',
        path: '/app/dashboard/pto/company-accruals',
        permission: PermissionRoleEnum.ADMIN,
      },
    ],
  },
  {
    title: 'Knowledge Base',
    Icon: Icons.Library,
    path: '/app/dashboard/documents',
    permission: PermissionRoleEnum.EMPLOYEE,
  },
  {
    title: 'Time Tracking',
    Icon: Icons.Clock,
    path: '/app/dashboard/time-tracking',
    permission: PermissionRoleEnum.EMPLOYEE,
    children: [
      {
        title: 'My Space',
        path: '/app/dashboard/time-tracking',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
      {
        title: 'Reports',
        path: '/app/dashboard/time-tracking/reports',
        permission: PermissionRoleEnum.ADMIN,
      },
      {
        title: 'Insights',
        path: '/app/dashboard/time-tracking/insights',
        permission: PermissionRoleEnum.ADMIN,
      },
    ],
  },
  {
    title: 'Project Management',
    Icon: Icons.ClipboardList,
    path: '/app/dashboard/project-management',
    permission: PermissionRoleEnum.EMPLOYEE,
  },
  {
    title: 'Check-ins',
    Icon: Icons.ClipboardEdit,
    path: '/app/dashboard/check-in/submissions/current',
    permission: PermissionRoleEnum.EMPLOYEE,
  },
  {
    title: 'Company Settings',
    Icon: Icons.Settings,
    path: '/app/dashboard/company/employees',
    permission: PermissionRoleEnum.ADMIN,
    children: [
      {
        title: 'Employees & Teams',
        path: '/app/dashboard/company/employees',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
      {
        title: 'Paid Time Off',
        path: '/app/dashboard/pto/settings/vacation-policies',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
      // {
      //   title: 'Time-Tracking',
      //   path: '/app/dashboard/settings',
      // },
      // {
      //   title: 'Payment Methods',
      //   path: '/app/dashboard/settings',
      // },
      {
        title: 'Check-ins',
        path: '/app/dashboard/check-in/settings',
        permission: PermissionRoleEnum.EMPLOYEE,
      },
    ],
  },
];

export default function Sidebar() {
  const { permissionCheck } = usePermissions();

  const pathname = usePathname();
  const [activeMenuItems, setActiveMenuItems] = useState(() => {
    const activeMenuItems: string[] = [];
    menuItems.forEach((menuItem) => {
      if (menuItem.path === pathname) {
        activeMenuItems.push(menuItem.path);
      }

      if (menuItem.children) {
        menuItem.children.forEach((child) => {
          if (child.path === pathname) {
            activeMenuItems.push(menuItem.path);
          }
        });
      }
    });
    return activeMenuItems;
  });

  useEffect(() => {
    menuItems.forEach((menuItem) => {
      if (menuItem.path === pathname) {
        setActiveMenuItems([menuItem.path]);
      }

      if (menuItem.children) {
        menuItem.children.forEach((child) => {
          if (child.path === pathname) {
            setActiveMenuItems([menuItem.path]);
          }
        });
      }
    });
  }, [pathname]);

  const onLogout = () => {
    emitter.emit('logout', { controlled: true });
  };

  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });

  const notificationsCountResult = useUnreadNotificationsCountQuery();

  const profileImageUrl = data?.currentUser.profilePhotoUrl;
  return (
    <>
      <div className="sm:hidden lg:flex flex flex-col fixed bottom-0 left-0 top-0 w-60 overflow-y-auto border-r border-gray-6 bg-gray-1">
        <div>
          <div className="flex items-center gap-2 p-4">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" />
            <h2 className="font-bold text-slate-700 text-xl">Whizzle</h2>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="px-2">
            <AccordionPrimitive.Root
              onValueChange={setActiveMenuItems}
              type="multiple"
              value={activeMenuItems}
            >
              <ul className="flex w-full flex-col">
                {menuItems
                  .filter((item) => permissionCheck(item.permission))
                  .map(({ title, Icon, path, children }) =>
                    children ? (
                      <AccordionPrimitive.Item
                        key={path}
                        asChild
                        className={clsx(
                          '-mx-3 rounded px-3',
                          path === pathname ||
                            children.some((child) => child.path === pathname)
                            ? 'bg-primary-4'
                            : '',
                        )}
                        value={path}
                      >
                        <li>
                          <AccordionPrimitive.Header asChild>
                            <span className="relative block">
                              <AccordionPrimitive.Trigger
                                aria-label={`Toggle submenu of ${title}`}
                                className="w-full"
                              >
                                <NavItem
                                  path={path}
                                  title={title}
                                  Icon={Icon}
                                  collapsible
                                  collapsed={activeMenuItems.some(
                                    (menuItemPath) => menuItemPath === path,
                                  )}
                                />
                              </AccordionPrimitive.Trigger>
                            </span>
                          </AccordionPrimitive.Header>
                          <AccordionPrimitive.Content asChild>
                            <ul
                              className={clsx(
                                '',
                                activeMenuItems.some(
                                  (menuItemPath) => menuItemPath === path,
                                )
                                  ? 'motion-safe:animate-accordion-open'
                                  : 'motion-safe:animate-accordion-close',
                              )}
                            >
                              {children
                                .filter((item) =>
                                  permissionCheck(item.permission),
                                )
                                .map(({ title, path }) => (
                                  <NavItem
                                    path={path}
                                    title={title}
                                    nested
                                    key={title}
                                    active={path === pathname}
                                  />
                                ))}
                            </ul>
                          </AccordionPrimitive.Content>
                        </li>
                      </AccordionPrimitive.Item>
                    ) : (
                      <NavItem
                        path={path}
                        title={title}
                        Icon={Icon}
                        key={title}
                        active={path === pathname}
                      />
                    ),
                  )}
              </ul>
            </AccordionPrimitive.Root>
          </div>
          <div className="flex flex-col">
            <Button variant="ghost" asChild>
              <Link
                href="/app/dashboard/notifications"
                className="w-full justify-between items-center flex"
              >
                <div className="flex gap-2 items-center">
                  <Icons.Bell size={18} />
                  Notifications
                </div>
                {(notificationsCountResult.data?.unreadNotificationsCount ??
                  0) > 0 && (
                  <div className="bg-orange-500 rounded-full  px-1 flex-shrink-0 flex-grow-0 w-[20px] h-[20px] items-center justify-center flex">
                    <span className="text-white text-xs">
                      {notificationsCountResult.data?.unreadNotificationsCount}
                    </span>
                  </div>
                )}
              </Link>
            </Button>
            <ProfilePopover
              profileImageUrl={profileImageUrl}
              data={data}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </>
  );
}
