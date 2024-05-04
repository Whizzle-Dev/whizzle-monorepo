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
  GetEmployeesDocument,
  GetRolesDocument,
  RoleDto,
  useAssignEmployeeToRoleMutation,
  useGetEmployeesQuery,
  useGetRoleQuery,
} from '@/generated';
import { useToast } from '@/components/ui/use-toast';

import { MultiSelect, MultiSelectProps } from '@/components/ui/multi-select';
import { FormEvent, useState } from 'react';

type AssignEmployeesToTitleDialogProps = {
  onOpenChange: (open: boolean) => void;
  role: RoleDto;
};

export const AssignEmployeesToTitleDialog = ({
  onOpenChange,
  role,
}: AssignEmployeesToTitleDialogProps) => {
  const roleId = role.id;
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const { data } = useGetEmployeesQuery({
    variables: {
      filters: {
        roleId: null,
      },
    },
  });

  const { data: roleData } = useGetRoleQuery({
    variables: {
      roleId,
    },
    onCompleted: (data) => {
      setSelectedEmployees(
        data.role.employees?.map((employee) => employee.id) ?? [],
      );
    },
  });

  const selectEmployeeOptions: MultiSelectProps<number>['options'] = [
    ...(roleData?.role.employees?.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
    })) ?? []),
    ...(data?.employees.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
    })) ?? []),
  ];

  const [assignToRole, { loading }] = useAssignEmployeeToRoleMutation({
    refetchQueries: [
      GetRolesDocument,
      { query: GetEmployeesDocument, variables: { filters: { roleId: null } } },
    ],
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
      roleData?.role.employees
        ?.filter((employee) => !selectedEmployees.includes(employee.id))
        ?.map((employee) => employee.id) ?? [];
    return assignToRole({
      variables: {
        roleId: roleId,
        employeeIds: selectedEmployees,
        removedIds,
      },
    });
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Assign title to the employees</DialogTitle>
          <DialogDescription>
            Select employees to be added to this title
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <MultiSelect
              value={selectedEmployees}
              searchPlaceholder="Search employees..."
              options={selectEmployeeOptions}
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
