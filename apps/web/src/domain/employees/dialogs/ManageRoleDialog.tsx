import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import {
  GetRolesDocument,
  RoleDto,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FormInput } from '@/components/ui/form/form-input';
import { useEffect } from 'react';
import { FormTextArea } from '@/components/ui/form/form-textarea';

type CreateRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: RoleDto;
};

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;
export const ManageRoleDialog = ({
  open,
  onOpenChange,
  role,
}: CreateRoleDialogProps) => {
  const { toast } = useToast();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: role?.name,
      description: role?.description,
    },
  });

  useEffect(() => {
    if (role) {
      methods.setValue('name', role.name);
      methods.setValue('description', role.description ?? '');
    }
  }, [role]);

  const [createRole, { loading: creating }] = useCreateRoleMutation({
    refetchQueries: [GetRolesDocument],
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to create a role',
        description: 'Please try again later',
      });
    },
    onCompleted: () => {
      methods.reset();
      toast({
        variant: 'default',
        title: 'Successfully created',
        description: 'You can now assign employees to the newly created role',
      });
      onOpenChange(false);
    },
  });

  const [updateRole, { loading: updating }] = useUpdateRoleMutation({
    refetchQueries: [GetRolesDocument],
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to update role',
        description: 'Please try again later',
      });
    },
    onCompleted: () => {
      methods.reset();
      toast({
        variant: 'default',
        title: 'Successfully updated',
        description: 'Role has been updated',
      });
      onOpenChange(false);
    },
  });
  function onSubmit(data: FormValues) {
    if (role) {
      return updateRole({
        variables: {
          id: role.id,
          name: data.name,
          description: data.description,
        },
      });
    } else {
      return createRole({
        variables: {
          name: data.name,
        },
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{role ? 'Update Role' : 'Create Role'}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormInput label="Role Name" field="name" />
              <FormTextArea
                label="Role Description (Optional)"
                field="description"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" loading={creating || updating}>
                {role ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
