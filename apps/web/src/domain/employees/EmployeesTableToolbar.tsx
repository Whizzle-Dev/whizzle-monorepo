import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/ui/icons';
import { useState } from 'react';
import { InviteOrEditEmployeeDialog } from '@/domain/employees/dialogs/InviteOrEditEmployeeDialog';
import { DataTableViewOptions } from '@/components/ui/data-table/DataTableViewOptions';
import { Table } from '@tanstack/react-table';
import { EmployeeFragment } from '@/generated';

interface EmployeesTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  table: Table<EmployeeFragment>;
}

export function EmployeesTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  table,
}: EmployeesTableToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
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
        <DataTableViewOptions table={table} />
        <Button
          variant="default"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={() => setIsOpen(true)}
        >
          <Icons.PlusIcon className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>
      <InviteOrEditEmployeeDialog open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
