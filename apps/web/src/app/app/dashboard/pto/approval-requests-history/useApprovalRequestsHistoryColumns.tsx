import * as React from 'react';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { PendingRequestForApprovalDto } from '@/generated';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { getBadgeVariantFromStatus } from '@/domain/pto/utils';

export const useApprovalRequestsHistoryColumns = () => {
  return useMemo(() => {
    const columns: ColumnDef<PendingRequestForApprovalDto>[] = [
      {
        accessorKey: 'requestedByName',
        header: () => <span>Requested By</span>,
        cell: ({ row }) => {
          const value = row.getValue<string>('requestedByName');

          return <div className="font-bold">{value}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
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
