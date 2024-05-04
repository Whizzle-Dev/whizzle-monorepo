import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

type Item<T> = {
  value: T;
  label: string;
};
type FilterButtonDropdownProps<T> = {
  activeItems: T[];
  items: Item<T>[];
  onChange: (item: { value: T; label: string }) => void;
  label: string;
  icon?: React.ReactNode;
};
export const FilterButtonDropdown = <T extends string | number>({
  label,
  activeItems,
  items,
  onChange,
  icon,
}: FilterButtonDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          <span>{label}</span>
          {activeItems.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2" />
              {/*// todo implement show 2 max and then tooltip with the rest*/}
              <span className="font-bold">
                {activeItems
                  .map(
                    (activeItem) =>
                      items.find((item) => item.value === activeItem)?.label ??
                      '',
                  )
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]" side="left">
        <ScrollArea maxHeight={300}>
          {items.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.value}
              className="capitalize"
              checked={activeItems.includes(item.value)}
              onCheckedChange={() => onChange(item)}
              onSelect={(e) => e.preventDefault()}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
