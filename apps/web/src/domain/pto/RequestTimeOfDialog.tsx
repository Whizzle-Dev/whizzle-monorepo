import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GetPtoRequestsForEmployeeDocument,
  useCreatePtoRequestMutation,
} from '@/generated';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormDateRangeInput } from '@/components/ui/form/form-date-range-input';
import dayjs from 'dayjs';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { getGraphqlError } from '@/lib/utils';

type RequestTimeOfDialogProps = {
  categoryId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const schema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(
      (data) => {
        const from = dayjs(data.from);
        return from.isAfter(dayjs());
      },
      { message: 'Start date must be in future.' },
    )
    .default({
      from: new Date(),
      to: new Date(),
    }),
  note: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

export const RequestTimeOfDialog = ({
  categoryId,
  open,
  onOpenChange,
}: RequestTimeOfDialogProps) => {
  const { toast } = useToast();
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [requestMutation] = useCreatePtoRequestMutation({
    refetchQueries: [GetPtoRequestsForEmployeeDocument],
  });
  const onSubmit = (formValues: FormValues) => {
    requestMutation({
      variables: {
        input: {
          categoryId,
          endDate: formValues.dateRange.to,
          startDate: formValues.dateRange.from,
          note: formValues.note,
        },
      },
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Successfully submitted',
          description: 'Your request has been submitted',
        });
        onOpenChange(false);
      })
      .catch((e) => {
        toast({
          variant: 'destructive',
          title: getGraphqlError(e),
        });
      });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Submit a Paid time off request</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <FormDateRangeInput
                label="Pick Dates"
                field="dateRange"
                placeholder="Pick Dates"
                isDisabled={(date) => dayjs(date).isBefore(dayjs())}
              />
              <FormInput
                field="note"
                label="Note"
                placeholder="Add Note (Optional)"
              />
              <DialogFooter className="mt-4">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
