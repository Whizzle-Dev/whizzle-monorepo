import { Route } from 'nextjs-routes';
import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

type NavItemProps = {
  path?: Route['pathname'];
  title: string;
  Icon?: React.ComponentType<any>;
  nested?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  active?: boolean;
};
export const NavItem = ({
  path,
  title,
  Icon,
  nested = false,
  collapsible,
  collapsed,
  active,
}: NavItemProps) => {
  const linkClassName = cn(
    'flex min-h-9 flex-grow items-center gap-3 rounded px-3 hover:bg-gray-200 py-2 my-0.5',
    nested ? 'py-2' : '',
    active ? 'bg-gray-200' : '',
  );

  const rightIcon = (
    <ChevronDownIcon
      aria-hidden
      className={clsx(
        collapsed
          ? '-rotate-180 ease-out motion-safe:duration-100'
          : 'rotate-0 ease-in motion-safe:duration-75',
        'ml-auto',
      )}
    />
  );
  if (!path || collapsible) {
    if (path) {
      return (
        <li>
          <Link className={linkClassName} href={path}>
            {Icon ? <Icon aria-hidden width={18} height={18} /> : null}
            <span className="block text-m tabular-nums leading-none">
              {title}
            </span>
            {rightIcon}
          </Link>
        </li>
      );
    }
    return (
      <li>
        <a className={linkClassName}>
          {Icon ? <Icon aria-hidden width={18} height={18} /> : null}
          <span className="block text-m tabular-nums leading-none">
            {title}
          </span>
          {rightIcon}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link className={linkClassName} href={path}>
        {Icon ? <Icon aria-hidden width={18} height={18} /> : null}
        <span
          className={cn(
            'block text-m tabular-nums leading-none',
            nested ? 'text-sm' : 'text-m',
          )}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};
