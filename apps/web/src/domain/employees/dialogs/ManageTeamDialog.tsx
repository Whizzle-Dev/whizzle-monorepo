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
  GetTeamsDocument,
  TeamDto,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FormInput } from '@/components/ui/form/form-input';
import { useEffect } from 'react';

type ManageTeamDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team?: TeamDto;
};

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
export const ManageTeamDialog = ({
  open,
  onOpenChange,
  team,
}: ManageTeamDialogProps) => {
  const { toast } = useToast();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: team?.name,
      description: team?.description ?? '',
    },
  });

  useEffect(() => {
    if (team) {
      methods.setValue('name', team.name);
      methods.setValue('description', team.description ?? '');
    }
  }, [team]);

  const [createTeam, { loading: creating }] = useCreateTeamMutation({
    refetchQueries: [GetTeamsDocument],
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to create a team',
        description: 'Please try again later',
      });
    },
    onCompleted: () => {
      methods.reset();
      toast({
        variant: 'default',
        title: 'Successfully created',
        description: 'You can now assign employees to the newly created team',
      });
      onOpenChange(false);
    },
  });

  const [updateTeam, { loading: updating }] = useUpdateTeamMutation({
    refetchQueries: [GetTeamsDocument],
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to update a team',
        description: 'Please try again later',
      });
    },
    onCompleted: () => {
      methods.reset();
      toast({
        variant: 'default',
        title: 'Successfully updated',
      });
      onOpenChange(false);
    },
  });

  function onSubmit(data: FormValues) {
    if (team) {
      return updateTeam({
        variables: {
          id: team.id,
          name: data.name,
          description: data.description ?? '',
        },
      });
    }
    return createTeam({
      variables: {
        name: data.name,
        description: data.description ?? '',
      },
    });
  }

  const loading = creating || updating;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{team ? 'Update Team' : 'Create Team'}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <FormInput label="Team Name" field="name" />
            <FormInput label="Description (Optional)" field="description" />
            <DialogFooter className="mt-4">
              <Button type="submit" loading={loading}>
                {team ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
