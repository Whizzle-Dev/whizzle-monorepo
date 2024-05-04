import * as React from 'react';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { PtoEmployeeRequestModel, PtoRequestStatus } from '@/generated';
import dayjs from 'dayjs';
import { Badge, BadgeProps } from '@/components/ui/badge';

export const useRequestsHistoryColumns = () => {
  return useMemo(() => {
    const columns: ColumnDef<PtoEmployeeRequestModel>[] = [
      {
        accessorKey: 'description',
        header: () => <span>Category</span>,
        cell: ({ row }) => {
          const value = row.original.leaveCategoryName || 'N/A';
          return <div className="">{value}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'startDate',
        header: () => <span>Start Date</span>,
        cell: ({ row }) => {
          const value = row.getValue<Date>('startDate');

          return <div>{dayjs(value).format('MMM DD, YYYY')}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'endDate',
        header: () => <span>End Date</span>,
        cell: ({ row }) => {
          const value = row.getValue<Date>('endDate');

          return <div>{dayjs(value).format('MMM DD, YYYY')}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'workingDays',
        header: () => <span>Working Days</span>,
        cell: ({ row }) => {
          return <div>{row.getValue<string>('workingDays')}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => {
          return (
            <Badge variant={getBadgeVariantFromStatus(row.original.status)}>
              {row.original.status}
            </Badge>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
    ];

    return columns;
  }, []);
};

const getBadgeVariantFromStatus = (
  status: PtoRequestStatus,
): BadgeProps['variant'] => {
  switch (status) {
    case PtoRequestStatus.APPROVED:
      return 'primary';
    case PtoRequestStatus.PENDING:
      return 'warning';
    case PtoRequestStatus.CANCELLED:
      return 'secondary';
    case PtoRequestStatus.REJECTED:
      return 'destructive_mild';
    default:
      return 'secondary';
  }
};
