import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import {
  EmployeeFragment,
  GetEmployeesDocument,
  useCancelInviteMutation,
} from '@/generated';
import { Row } from '@tanstack/react-table';
import { InviteOrEditEmployeeDialog } from '@/domain/employees/dialogs/InviteOrEditEmployeeDialog';
import { useState } from 'react';

interface EmployeesTableRowActionsProps {
  employee: Row<EmployeeFragment>;
}

export function EmployeesTableRowActions({
  employee,
}: EmployeesTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cancelInvite] = useCancelInviteMutation({
    refetchQueries: [GetEmployeesDocument],
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onSelect={() => {
              setIsOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          {employee.getValue('status') === 'INVITED' && (
            <DropdownMenuItem
              onSelect={() => {
                cancelInvite({
                  variables: {
                    employeeId: employee.original.id,
                  },
                });
              }}
            >
              Cancel Invitation
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <InviteOrEditEmployeeDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        employee={employee.original}
      />
    </>
  );
}
