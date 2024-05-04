import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/SideBarNav';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Route } from 'nextjs-routes';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

interface SettingsLayoutProps {
  children:
    | (({
        selectedSection,
      }: {
        selectedSection: string | undefined;
      }) => React.ReactNode)
    | React.ReactNode;
  sidebarNavItems: readonly SideBarNavItem[];
  title: string;
  description?: string;
  className?: string;
  withSidebar?: boolean;
  withPath?: boolean;
}
export type SideBarNavItem = {
  key: string;
  title: string;
  path?: Route['pathname'];
};

export default function SettingsLayout({
  children,
  sidebarNavItems,
  title,
  description,
  className,
  withSidebar = true,
  withPath = false,
}: SettingsLayoutProps) {
  const [selectedSection, setSelectedSection] = useState(
    sidebarNavItems[0]?.key,
  );
  const titleToDisplay =
    sidebarNavItems.find((item) => item.key === selectedSection)?.title ||
    title;

  const renderChildren = () => {
    return typeof children === 'function'
      ? children({ selectedSection })
      : children;
  };
  return (
    <>
      <div className="hidden space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold">{titleToDisplay}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>

        <Separator className="my-6" />
        {withSidebar ? (
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 pr-8">
              <SidebarNav
                items={sidebarNavItems}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
                withPath={withPath}
              />
            </aside>
            <Separator
              className="hidden lg:block min-h-screen"
              orientation="vertical"
            />
            <div className={cn('flex-1 max-w-screen-lg', className)}>
              {renderChildren()}
            </div>
          </div>
        ) : (
          renderChildren()
        )}
      </div>
    </>
  );
}
