import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  GetTeamsDocument,
  useAssignEmployeeToTeamMutation,
  useGetEmployeesQuery,
  useGetTeamQuery,
} from '@/generated';
import { useToast } from '@/components/ui/use-toast';

import { MultiSelect, MultiSelectProps } from '@/components/ui/multi-select';
import { FormEvent, useState } from 'react';

type AssignEmployeeToTeamDialogProps = {
  onOpenChange: (open: boolean) => void;
  teamId: number;
};

export const AssignEmployeeToTeamDialog = ({
  onOpenChange,
  teamId,
}: AssignEmployeeToTeamDialogProps) => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const { data } = useGetEmployeesQuery({
    variables: {
      filters: {
        teamId: null,
      },
    },
  });

  const { data: teamData } = useGetTeamQuery({
    variables: {
      teamId,
    },
    onCompleted: (data) => {
      setSelectedEmployees(
        data.team.employees?.map((employee) => employee.id) ?? [],
      );
    },
  });
  const [assignEmployeeToTeam, { loading }] = useAssignEmployeeToTeamMutation({
    refetchQueries: [GetTeamsDocument],
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to assign an employee',
        description: 'Please try again later',
      });
    },
    onCompleted: () => {
      toast({
        variant: 'default',
        title: 'Successfully assigned employees',
      });
      onOpenChange(false);
    },
  });
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const removedIds =
      teamData?.team.employees
        ?.filter((employee) => !selectedEmployees.includes(employee.id))
        ?.map((employee) => employee.id) ?? [];
    return assignEmployeeToTeam({
      variables: {
        teamId: teamId,
        employeeIds: selectedEmployees,
        removedIds,
      },
    });
  }

  const selectEmployeeOptions: MultiSelectProps<number>['options'] = [
    ...(teamData?.team.employees?.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
    })) ?? []),
    ...(data?.employees.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
    })) ?? []),
  ];

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add employees to the team</DialogTitle>
          <DialogDescription>
            Select employees to be added to this team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <MultiSelect
              searchPlaceholder="Search employees..."
              options={selectEmployeeOptions}
              value={selectedEmployees}
              onChange={setSelectedEmployees}
            />
          </div>
          <DialogFooter>
            <Button type="submit" loading={loading}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
