import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { TimeEntryFragment } from '@/generated';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { DataTableColumnHeader } from '@/components/ui/data-table/DataTableColumnHeader';

import { EmployeeAvatar } from '@/components/ui/avatar';
import { displayElapsedTime } from '@/lib/date/displayElapsedTime';
import { TimeTrackingRowActions } from '@/domain/time-tracking/TimeTrackingRowActions';

const columnAccessor = createColumnHelper<TimeEntryFragment>();

type ConfigProps = {
  employeeColumn?: boolean;
};
export const useTimeTrackingColumns = ({
  employeeColumn = false,
}: ConfigProps) => {
  return useMemo(() => {
    const emplyeeColumnDef: ColumnDef<TimeEntryFragment, any> = {
      accessorFn: (row) => row.employee?.id ?? '',
      id: 'Employee',
      header: ({ column }) => (
        <DataTableColumnHeader title="Employeee" column={column} />
      ),
      aggregatedCell: ({ row }) => {
        return (
          <div className="flex flex-row items-center gap-4">
            <EmployeeAvatar
              src={row.original.employee?.profilePhotoUrl}
              name={row.original.employee?.name}
              size="small"
            />
            <span>{row.original.employee?.name}</span>
          </div>
        );
      },
      cell: ({ row }) => {
        if (!row.original.employee) {
          return null;
        }
        return (
          <div className="w-[180px] flex flex-row items-center gap-4">
            <EmployeeAvatar
              src={row.original.employee?.profilePhotoUrl}
              name={row.original.employee?.name}
            />
            <span>{row.original.employee.name}</span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
      enableGrouping: true,
    };
    const columns: ColumnDef<TimeEntryFragment, any>[] = [
      columnAccessor.accessor('description', {
        header: () => <span>Description</span>,
        cell: ({ row }) => (
          <div className="font-bold min-w-[300px]">
            {row.getValue('description')}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      }),
      columnAccessor.accessor('project.name', {
        id: 'Project',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Project" />
        ),
        cell: ({ row }) => {
          return (
            <div className="min-w-[200px]">
              <span>{row.original.project?.name}</span>
            </div>
          );
        },
        enableGrouping: true,
      }),
      columnAccessor.accessor('task.name', {
        id: 'Task',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Task" />
        ),
        cell: ({ row }) => {
          return (
            <div className="min-w-[200px]">
              <span>{row.original.task?.name}</span>
            </div>
          );
        },
        enableGrouping: true,
      }),
      {
        id: 'Date',
        accessorFn: (row) => row.startDate,
        getGroupingValue: (row) => dayjs(row.startDate).format('MMMM, DD.'),
        aggregatedCell: ({ row }) => {
          return (
            <div className="flex flex-row items-center gap-2 min-w-[100px]">
              <span className="font-bold">
                {dayjs(row.original.startDate).format('MMMM, DD.')}
              </span>
            </div>
          );
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
          const value = row.original.startDate;
          return (
            <div className="flex flex-row items-center min-w-[120px]">
              <span className="font-bold">
                {dayjs(value).format('MMMM, DD.')}
              </span>
            </div>
          );
        },
        enableGrouping: true,
      },
      ...(employeeColumn ? [emplyeeColumnDef] : []),
      {
        accessorFn: (row) => {
          return displayElapsedTime(row.startDate, row.endDate);
        },
        id: 'duration',
        header: () => <span>Duration</span>,
        cell: ({ row }) => {
          return (
            <div className="flex flex-row items-center gap-2 min-w-[120px]">
              <span>
                {displayElapsedTime(
                  row.original.startDate,
                  row.original.endDate,
                )}
              </span>
            </div>
          );
        },
        enableGrouping: false,
      },
      columnAccessor.accessor('startDate', {
        id: 'Start Time',
        header: () => <span>Start Time</span>,
        cell: ({ row }) => {
          const value = row.original.startDate;
          return (
            <div className="flex flex-row items-center gap-2 min-w-[100px]">
              <span className="font-bold">
                {dayjs(value).format('HH:mm:ss')}
              </span>
            </div>
          );
        },
        enableGrouping: false,
      }),
      columnAccessor.accessor('endDate', {
        id: 'End Time',
        header: () => <span>End Time</span>,
        cell: ({ row }) => {
          const value = row.original.endDate;
          return (
            <div className="flex flex-row items-center gap-2 min-w-[100px]">
              <span className="font-bold">
                {dayjs(value).format('HH:mm:ss')}
              </span>
            </div>
          );
        },
        enableGrouping: false,
      }),

      {
        id: 'actions-column',
        header: () => null,
        cell: ({ row }) => {
          return <TimeTrackingRowActions data={row.original} />;
        },
        enablePinning: true,
        enableGrouping: false,
      },
    ];

    return columns;
  }, [employeeColumn]);
};
