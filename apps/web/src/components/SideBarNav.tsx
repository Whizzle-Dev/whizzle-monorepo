import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SideBarNavItem } from './layout/SettingsLayout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Route } from 'nextjs-routes';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: readonly SideBarNavItem[];
  selectedSection: string | undefined;
  setSelectedSection: (section: string) => void;
  withPath?: boolean;
  path?: Route['pathname'];
}

export function SidebarNav({
  className,
  items,
  setSelectedSection,
  selectedSection,
  withPath,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 w-full',
        className,
      )}
      {...props}
    >
      {items.map((item) =>
        withPath && item.path ? (
          <Link
            key={item.key}
            href={item.path}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.path
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-gray-100',
              'justify-start w-full',
            )}
            onClick={() => setSelectedSection(item.key)}
          >
            {item.title}
          </Link>
        ) : (
          <button
            key={item.key}
            onClick={() => {
              setSelectedSection(item.key);
            }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              selectedSection === item.key
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-gray-100',
              'justify-start',
            )}
          >
            {item.title}
          </button>
        ),
      )}
    </nav>
  );
}
