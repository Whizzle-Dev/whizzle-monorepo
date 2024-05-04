import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/ui/icons';
import { useState } from 'react';
import { ManageRoleDialog } from '@/domain/employees/dialogs/ManageRoleDialog';

interface RolesTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
}

export function RolesTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: RolesTableToolbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="gap-2 flex flex-row">
        <Button
          variant="default"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={() => setOpen(true)}
        >
          <Icons.PlusIcon className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>
      <ManageRoleDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
