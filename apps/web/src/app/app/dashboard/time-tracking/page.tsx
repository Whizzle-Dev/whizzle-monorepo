'use client';

import React, { useEffect } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import {
  GetActiveTimerDocument,
  GetTimeEntriesDocument,
  TimeEntryFragment,
  useGetActiveTimerQuery,
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
  useUpdateActiveTimerMutation,
} from '@/generated';
import { TimeTrackingLoadingShimmer } from '@/components/ui/loader';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form/form-input';
import { useTimeTrackingColumns } from '@/domain/time-tracking/columns';
import { FormValues, schema } from '@/domain/time-tracking/form';
import { TaskSelect } from '@/domain/time-tracking/TaskSelect';
import { Timer } from '@/domain/time-tracking/Timer';
import { ProjectSelect } from '@/domain/time-tracking/ProjectSelect';
import { TimeTrackingTableToolbar } from '@/domain/time-tracking/TimeTrackingTableToolbar';
import { ManageTimeEntryDialog } from '@/domain/time-tracking/ManageTimeEntryDialog';

const TimeTrackingPage = () => {
  const timeEntriesQuery = useGetTimeEntriesQuery();
  const { data: activeTimerData, loading: loadingActiveTimer } =
    useGetActiveTimerQuery();
  const isTimerRunning = !!activeTimerData?.activeTimer?.id;

  const columns = useTimeTrackingColumns({
    employeeColumn: false,
  });
  const { table } = useDataTable<TimeEntryFragment>({
    data: timeEntriesQuery.data?.timeEntries,
    columns,
  });
  const [startTimer, { loading: starting }] = useStartTimerMutation({
    refetchQueries: [GetActiveTimerDocument],
  });
  const [stopTimer, { loading: stopping }] = useStopTimerMutation({
    refetchQueries: [GetActiveTimerDocument, GetTimeEntriesDocument],
  });

  const [updateActive] = useUpdateActiveTimerMutation();

  const startTime = activeTimerData?.activeTimer?.startDate;

  const methods = useForm<FormValues>({
    // @ts-expect-error todo remove
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const submit = (values: FormValues) => {
    if (starting || stopping) {
      return;
    }
    if (!isTimerRunning) {
      return startTimer({
        variables: {
          payload: {
            description: values.description,
            startDate: new Date(),
            taskId: Number(values.taskId),
          },
        },
      });
    } else {
      return stopTimer();
    }
  };

  useEffect(() => {
    if (
      activeTimerData?.activeTimer &&
      activeTimerData.activeTimer.description
    ) {
      methods.setValue('description', activeTimerData.activeTimer.description);
      if (
        activeTimerData.activeTimer.taskId &&
        activeTimerData.activeTimer.projectId
      ) {
        methods.setValue(
          'projectId',
          activeTimerData.activeTimer.projectId.toString(),
        );
        methods.setValue(
          'taskId',
          activeTimerData.activeTimer.taskId.toString(),
        );
      }
    } else {
      methods.setValue('description', '');
      methods.setValue('projectId', '');
      methods.setValue('taskId', '');
    }
  }, [activeTimerData?.activeTimer]);

  const [manageOpen, setManageOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full gap-4 mb-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submit)}
            id="timer-form"
            className="flex flex-row gap-4"
          >
            <FormInput
              label=""
              placeholder="What are you working on?"
              className="w-[300px]"
              field="description"
              onBlur={(event) => {
                if (isTimerRunning) {
                  updateActive({
                    variables: {
                      payload: {
                        description: event.target.value,
                      },
                    },
                  });
                }
              }}
            />

            <ProjectSelect />
            <TaskSelect
              onChange={(value) => {
                if (isTimerRunning) {
                  updateActive({
                    variables: {
                      payload: {
                        taskId: Number(value),
                      },
                    },
                  });
                }
              }}
            />
          </form>
        </FormProvider>

        <div className="ml-auto flex flex-row gap-2">
          {loadingActiveTimer ? (
            <TimeTrackingLoadingShimmer />
          ) : (
            <>
              <div className="h-9 w-24 flex items-center justify-center border-1 border-gray-300 rounded-md px-2">
                <span className="text-gray-500">
                  <Timer time={startTime} />
                </span>
              </div>
              <Button
                type="submit"
                form="timer-form"
                variant={isTimerRunning ? 'destructive' : 'default'}
              >
                <div className="flex flex-row items-center gap-2">
                  <Icons.Clock size={16} />
                  {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
                </div>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Icons.MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setManageOpen(true);
                    }}
                  >
                    Add Manual Entry
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {manageOpen && (
                <ManageTimeEntryDialog onOpenChange={setManageOpen} />
              )}
            </>
          )}
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <div className="flex flex-col gap-2 mt-4">
          <TimeTrackingTableToolbar
            searchPlaceholder="Search..."
            searchValue={
              (table.getColumn('description')?.getFilterValue() as string) ?? ''
            }
            onSearchChange={(value) =>
              table.getColumn('description')?.setFilterValue(value)
            }
            table={table}
          />
          <DataTable
            colSpan={columns.length}
            table={table}
            loading={timeEntriesQuery.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(TimeTrackingPage);
