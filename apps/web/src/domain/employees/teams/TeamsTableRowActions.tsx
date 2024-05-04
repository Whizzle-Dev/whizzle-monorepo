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
import { GetTeamsDocument, TeamDto, useDeleteTeamMutation } from '@/generated';
import { AssignEmployeeToTeamDialog } from '@/domain/employees/dialogs/AssignEmployeeToTeamDialog';
import { useState } from 'react';
import { ManageTeamDialog } from '@/domain/employees/dialogs/ManageTeamDialog';

interface TeamsTableRowActionsProps {
  team: Row<TeamDto>;
}

export function TeamsTableRowActions({ team }: TeamsTableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [editTeamOpen, setEditTeamOpen] = useState(false);

  const hasEmployeesAssigned = Boolean(team.original.numberOfEmployees);
  const canDelete = !hasEmployeesAssigned;

  const [deleteMutation] = useDeleteTeamMutation({
    refetchQueries: [GetTeamsDocument],
  });
  return (
    <>
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
          <DropdownMenuItem onClick={() => setEditTeamOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Assign Employees
          </DropdownMenuItem>
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  deleteMutation({
                    variables: {
                      id: team.original.id,
                    },
                  })
                }
              >
                Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <AssignEmployeeToTeamDialog
          onOpenChange={setOpen}
          teamId={team.original.id}
        />
      )}
      <ManageTeamDialog
        open={editTeamOpen}
        onOpenChange={setEditTeamOpen}
        team={team.original}
      />
    </>
  );
}
