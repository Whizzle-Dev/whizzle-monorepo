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
  GetVacationPoliciesDocument,
  LightEmployeeFragment,
  useAssignEmployeeToVacationPolicyMutation,
  useGetEmployeesQuery,
} from '@/generated';
import { useToast } from '@/components/ui/use-toast';

import { MultiSelect, MultiSelectProps } from '@/components/ui/multi-select';
import { FormEvent, useEffect, useState } from 'react';

type AssignEmployeesToVacationPolicyDialogProps = {
  onOpenChange: (open: boolean) => void;
  id: number;
  name: string;
  employeesAssigned: LightEmployeeFragment[];
};

export const AssignEmployeesToVacationPolicyDialog = ({
  onOpenChange,
  id,
  name,
  employeesAssigned,
}: AssignEmployeesToVacationPolicyDialogProps) => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  useEffect(() => {
    setSelectedEmployees(
      employeesAssigned.map((employee) => employee.id) ?? [],
    );
  }, [employeesAssigned]);

  const { data } = useGetEmployeesQuery({
    variables: {},
  });

  const selectEmployeeOptions: MultiSelectProps<number>['options'] = [
    ...(data?.employees.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
    })) ?? []),
  ];

  const [assignToPolicy, { loading }] =
    useAssignEmployeeToVacationPolicyMutation({
      refetchQueries: [GetVacationPoliciesDocument],
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
      employeesAssigned
        ?.filter((employee) => !selectedEmployees.includes(employee.id))
        ?.map((employee) => employee.id) ?? [];
    return assignToPolicy({
      variables: {
        policyId: id,
        employeeIds: selectedEmployees,
        removedIds,
      },
    });
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Assign Employees to Vacation Policy</DialogTitle>
          <DialogDescription>
            Select Employees where Vacation Policy: {name} is applicable
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
