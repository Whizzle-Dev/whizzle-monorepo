import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { GetRolesDocument, RoleDto, useDeleteRoleMutation } from '@/generated';
import { useState } from 'react';
import { AssignEmployeesToTitleDialog } from '@/domain/employees/roles/AssignEmployeeToRoleDialog';
import { ManageRoleDialog } from '@/domain/employees/dialogs/ManageRoleDialog';

interface RolesTableRowActionsProps {
  role: Row<RoleDto>;
}

export function RolesTableRowActions({ role }: RolesTableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const hasEmployeesAssigned = Boolean(role.original.employees?.length);
  const canDelete = !hasEmployeesAssigned;

  const [deleteMutation] = useDeleteRoleMutation({
    refetchQueries: [GetRolesDocument],
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setManageOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Assign Employees
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {canDelete && (
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                deleteMutation({ variables: { id: role.original.id } });
              }}
            >
              Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <AssignEmployeesToTitleDialog
          onOpenChange={setOpen}
          role={role.original}
        />
      )}
      <ManageRoleDialog
        open={manageOpen}
        onOpenChange={setManageOpen}
        role={role.original}
      />
    </div>
  );
}
