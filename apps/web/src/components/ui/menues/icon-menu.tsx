import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';

type IconMenuProps = {
  icon: React.ReactNode;
  items: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    className?: string;
  }[];
  buttonSize?: ButtonProps['size'];
  buttonVariant?: ButtonProps['variant'];
  className?: string;
};
export const IconMenu = ({
  icon,
  items,
  buttonSize,
  buttonVariant = 'ghost',
  className,
}: IconMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={className}>
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className={item.className}
          >
            {item.label}
            <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
