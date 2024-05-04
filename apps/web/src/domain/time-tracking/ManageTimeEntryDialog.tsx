import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import {
  GetTimeEntriesDocument,
  TimeEntryFragment,
  useCreateManualTimeEntryMutation,
  useEditTimeEntryMutation,
} from '@/generated';
import { ProjectSelect } from '@/domain/time-tracking/ProjectSelect';
import { TaskSelect } from '@/domain/time-tracking/TaskSelect';
import dayjs from 'dayjs';
import { getGraphqlError } from '@/lib/utils';

type ManageTimeEntryDialogProps = {
  onOpenChange: (open: boolean) => void;
  defaultValues?: TimeEntryFragment | null;
};

export const ManageTimeEntryDialog = ({
  onOpenChange,
  defaultValues,
}: ManageTimeEntryDialogProps) => {
  const { toast } = useToast();

  const [create] = useCreateManualTimeEntryMutation({
    refetchQueries: [GetTimeEntriesDocument],
    awaitRefetchQueries: true,
  });
  const [update] = useEditTimeEntryMutation({
    refetchQueries: [GetTimeEntriesDocument],
    awaitRefetchQueries: true,
  });
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: defaultValues?.description || '',
      startTime: defaultValues
        ? dayjs(defaultValues.startDate).format('HH:mm')
        : '',
      endTime: defaultValues
        ? dayjs(defaultValues.endDate).format('HH:mm')
        : '',
      startDate: defaultValues?.startDate
        ? new Date(defaultValues.startDate)
        : undefined,
      endDate: defaultValues?.endDate
        ? new Date(defaultValues.endDate)
        : undefined,
      taskId: defaultValues ? defaultValues?.task?.id.toString() : '',
      projectId: defaultValues ? defaultValues?.project?.id.toString() : '',
    },
  });

  const onSubmit = (formValues: FormValues) => {
    if (defaultValues) {
      update({
        variables: {
          payload: {
            id: defaultValues.id,
            taskId: Number(formValues.taskId),
            description: formValues.description,
            startDate: dayjs(
              dayjs(formValues.startDate).format('YYYY-MM-DD') +
                'T' +
                formValues.startTime +
                ':00',
            ).toDate(),
            endDate: dayjs(
              dayjs(formValues.endDate).format('YYYY-MM-DD') +
                'T' +
                formValues.endTime +
                ':00',
            ).toDate(),
          },
        },
      })
        .then(() => {
          toast({
            variant: 'default',
            title: 'Successfully submitted',
            description: 'Your time entry has been updated',
          });
          onOpenChange(false);
        })
        .catch((e) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.message,
          });
        });
    } else {
      create({
        variables: {
          payload: {
            taskId: Number(formValues.taskId),
            description: formValues.description,
            startDate: dayjs(
              dayjs(formValues.startDate).format('YYYY-MM-DD') +
                'T' +
                formValues.startTime +
                ':00',
            ).toDate(),
            endDate: dayjs(
              dayjs(formValues.endDate).format('YYYY-MM-DD') +
                'T' +
                formValues.endTime +
                ':00',
            ).toDate(),
          },
        },
      })
        .then(() => {
          toast({
            variant: 'default',
            title: 'Successfully submitted',
            description: 'Your time entry has been submitted',
          });
          onOpenChange(false);
        })
        .catch((e) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: getGraphqlError(e),
          });
        });
    }
  };
  return (
    <>
      <Dialog onOpenChange={onOpenChange} defaultOpen>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              {defaultValues ? 'Update Time Entry' : 'Create Time Entry'}
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <FormInput
                field="description"
                label="Description"
                placeholder="Add Description"
              />
              <FormDateInput label="Start Date" field="startDate" />
              <FormInput
                field="startTime"
                label="Start Time"
                placeholder="e.g. 12:00"
              />
              <FormDateInput label="End Date" field="endDate" />
              <FormInput
                field="endTime"
                label="End Time"
                placeholder="e.g. 13:00"
              />
              <ProjectSelect label="Select Project" />
              <TaskSelect label="Select Task" />
              <DialogFooter className="mt-4">
                <Button type="submit">
                  {defaultValues ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

const schema = z.object({
  description: z.string().min(3).max(255),
  startTime: z.string().refine((v) => v.length === 5 && v.includes(':'), {
    message: 'Invalid time',
  }),
  endTime: z.string().refine((v) => v.length === 5 && v.includes(':'), {
    message: 'Invalid time',
  }),
  startDate: z.date(),
  endDate: z.date(),
  taskId: z.string(),
  projectId: z.string(),
});

type FormValues = z.infer<typeof schema>;
