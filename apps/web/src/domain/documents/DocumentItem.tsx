import React, { FocusEventHandler } from 'react';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import { DropdownMenuShortcut } from '@/components/ui/menues/dropdown-menu';
import { clsx } from 'clsx';

type DocumentItemProps = {
  icon: React.ReactElement | null;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClick?: () => void;
  selected?: boolean;
  handleDelete?: () => void;
};
export const DocumentItem = ({
  icon,
  name,
  onClick,
  selected,
  handleDelete,
}: DocumentItemProps) => {
  return (
    <div
      className={clsx(
        'h-[32px] group flex flex-row rounded border-gray-200 border-solid border w-[300px] items-center gap-2 px-2 py-0.5 cursor-pointer box-border',
        selected ? 'bg-gray-100 border-1' : '',
      )}
      onClick={onClick}
    >
      {icon ? React.cloneElement(icon, { size: 18 }) : <div />}
      <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {name}
      </div>

      <IconMenu
        className="ml-auto hidden group-hover:flex data-[state=open]:flex"
        buttonSize="iconSmall"
        icon={<Icons.MoreHorizontal size={16} />}
        items={[
          {
            label: 'Make Public',
            onClick: () => console.log('todo'),
          },
          {
            label: 'Delete',
            onClick: () => handleDelete?.(),
            icon: <DropdownMenuShortcut>⌫</DropdownMenuShortcut>,
            className: 'text-red-500',
          },
        ]}
      />
    </div>
  );
};
