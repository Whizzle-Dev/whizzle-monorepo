import {
  GetTimeEntriesDocument,
  TimeEntryFragment,
  useDeleteTimeEntryMutation,
} from '@/generated';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { ManageTimeEntryDialog } from '@/domain/time-tracking/ManageTimeEntryDialog';

type TimeTrackingRowActionsProps = {
  data: TimeEntryFragment;
};
export const TimeTrackingRowActions = ({
  data,
}: TimeTrackingRowActionsProps) => {
  const [deleteMutation, { loading: deleting }] = useDeleteTimeEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [GetTimeEntriesDocument],
  });

  const [open, setOpen] = useState(false);

  const [timeEntry, setTimeEntry] = useState<TimeEntryFragment | null>(null);
  return (
    <>
      <div className="flex flex-row gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setTimeEntry(data);
            setOpen(true);
          }}
        >
          <Icons.Edit2 size={18} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          loading={deleting}
          onClick={() =>
            deleteMutation({
              variables: {
                id: data.id,
              },
            })
          }
        >
          <Icons.Trash2 size={18} className="text-red-500" />
        </Button>
      </div>
      {open && timeEntry && (
        <ManageTimeEntryDialog
          onOpenChange={setOpen}
          defaultValues={timeEntry}
        />
      )}
    </>
  );
};
