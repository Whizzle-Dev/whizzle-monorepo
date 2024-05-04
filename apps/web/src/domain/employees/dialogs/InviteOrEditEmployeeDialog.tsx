import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import {
  EmployeeFragment,
  GetEmployeesDocument,
  PermissionRoleEnum,
  useEditEmployeeMutation,
  useGetTeamsQuery,
  useInviteEmployeeMutation,
} from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import React, { useEffect } from 'react';
import { useTitleSelectOptions } from '@/domain/shared/useTitleSelectOptions';
import { getGraphqlError } from '@/lib/utils';

type InviteEmployeeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: EmployeeFragment | null;
};

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().nullable(),
  team: z.string().nullable(),
  permissionRole: z.enum([
    PermissionRoleEnum.ACCOUNT_OWNER,
    PermissionRoleEnum.ADMIN,
    PermissionRoleEnum.MANAGER,
    PermissionRoleEnum.EMPLOYEE,
  ]),
});

type FormValues = z.infer<typeof schema>;
export const InviteOrEditEmployeeDialog = ({
  open,
  onOpenChange,
  employee,
}: InviteEmployeeDialogProps) => {
  const { data: teamData } = useGetTeamsQuery({
    fetchPolicy: 'cache-first',
  });
  const titleOptions = useTitleSelectOptions();
  const { toast } = useToast();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      permissionRole: PermissionRoleEnum.EMPLOYEE,
    },
  });

  useEffect(() => {
    if (employee) {
      methods.setValue('email', employee.email);
      methods.setValue('name', employee.name ?? '');
      methods.setValue('role', employee.role?.id?.toString() ?? null);
      methods.setValue('team', employee.team?.id?.toString() ?? null);
      methods.setValue('permissionRole', employee.permissionRole);
    }
  }, [employee]);

  const { handleSubmit, reset } = methods;
  const [inviteEmployee, { loading: inviting }] = useInviteEmployeeMutation({
    refetchQueries: [GetEmployeesDocument],
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Failed to invite an employee',
        description: getGraphqlError(e),
      });
    },
    onCompleted: () => {
      reset();
      toast({
        variant: 'default',
        title: 'Successfully sent invitation',
        description:
          'Employee should receive an email invite to setup his account',
      });
      onOpenChange(false);
    },
  });

  const [editEmployee, { loading: updating }] = useEditEmployeeMutation({
    refetchQueries: [GetEmployeesDocument],
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update an employee',
        description: getGraphqlError(e),
      });
    },
    onCompleted: () => {
      reset();
      toast({
        variant: 'default',
        title: 'Successfully updated employee',
      });
      onOpenChange(false);
    },
  });

  const loading = inviting || updating;

  function onSubmit(data: FormValues) {
    if (employee) {
      // Update employee
      return editEmployee({
        variables: {
          employeeId: employee.id,
          input: {
            email: data.email,
            name: data.name,
            roleId: data.role ? Number(data.role) : null,
            teamId: data.team ? Number(data.team) : null,
            permission: data.permissionRole,
          },
        },
      });
    }
    return inviteEmployee({
      variables: {
        email: data.email,
        name: data.name,
        roleId: data.role ? Number(data.role) : null,
        teamId: data.team ? Number(data.team) : null,
        permission: data.permissionRole,
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Edit employee' : 'Invite a new employee'}
          </DialogTitle>
          {!employee && (
            <DialogDescription>
              Send an email invitation to your employee
            </DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <div className="grid gap-4 mb-4">
              <FormInput
                placeholder="Email"
                field="email"
                label="Employee Email"
              />
              <FormInput
                placeholder="Full Name"
                field="name"
                label="Employee Name"
              />
              <FormSelect
                field="permissionRole"
                label="Assign Permission"
                items={permissionRoleOptions}
                renderItem={(item) => (
                  <FormSelect.Item
                    key={item.value}
                    value={item.value.toString()}
                  >
                    {item.label}
                  </FormSelect.Item>
                )}
              />
              <FormSelect
                field="role"
                label="Assign Title/Position (Optional)"
                items={titleOptions}
                renderItem={(item) => (
                  <FormSelect.Item
                    key={item.value}
                    value={item.value.toString()}
                  >
                    {item.label}
                  </FormSelect.Item>
                )}
              />
              <FormSelect
                field="team"
                label="Assign to Team (Optional)"
                items={
                  teamData?.teams.map((team) => ({
                    value: team.id,
                    label: team.name,
                  })) ?? []
                }
                renderItem={(item) => (
                  <FormSelect.Item
                    key={item.value}
                    value={item.value.toString()}
                  >
                    {item.label}
                  </FormSelect.Item>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" loading={loading}>
                {employee ? 'Update' : 'Invite'}
              </Button>
            </DialogFooter>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const permissionRoleOptions = [
  { label: 'Account Owner', value: PermissionRoleEnum.ACCOUNT_OWNER },
  { label: 'Admin', value: PermissionRoleEnum.ADMIN },
  { label: 'Manager', value: PermissionRoleEnum.MANAGER },
  { label: 'Employee', value: PermissionRoleEnum.EMPLOYEE },
];
