import * as React from 'react';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  CheckInSubmissionFragment,
  CheckInSubmissionStatus,
} from '@/generated';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Link from 'next/link';

import { EmployeeAvatar } from '@/components/ui/avatar';

export const useCheckInTableColumns = () => {
  return useMemo(() => {
    const columns: ColumnDef<CheckInSubmissionFragment>[] = [
      {
        accessorKey: 'prettyName',
        header: () => <span>Check-In</span>,
        cell: ({ row }) => (
          <div className="font-bold">{row.getValue('prettyName')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'employee',
        header: () => <span>Employee</span>,
        cell: ({ row }) => (
          <div className="w-[200px] flex flex-row justify-between gap-4">
            <span>{row.original.employee.name}</span>
            <EmployeeAvatar
              src={row.original.employee.profilePhotoUrl}
              name={row.original.employee.name}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge variant={getBadgeVariantFromCheckInStatus(status)}>
              {status}
            </Badge>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        id: 'actions',
        header: () => null,
        cell: ({ row }) => {
          return (
            <div className="w-full flex justify-end">
              <Button variant="secondary" size="sm" asChild>
                <Link
                  href={{
                    pathname: '/app/dashboard/check-in/submissions',
                    query: { id: row.original.id.toString() },
                  }}
                >
                  View
                  <Icons.ChevronRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
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

const getBadgeVariantFromCheckInStatus = (
  status: CheckInSubmissionStatus,
): BadgeProps['variant'] => {
  return status === 'PENDING'
    ? 'warning'
    : status === 'SUBMITTED'
    ? 'primary'
    : 'secondary';
};
