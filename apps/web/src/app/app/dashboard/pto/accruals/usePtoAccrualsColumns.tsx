import * as React from 'react';
import { useMemo } from 'react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { LeaveAccrualFragment, LeaveAccrualStatus } from '@/generated';
import dayjs from 'dayjs';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-table/DataTableColumnHeader';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';

import { EmployeeAvatar } from '@/components/ui/avatar';

export const usePtoAccrualsColumns = ({ admin = false }) => {
  return useMemo(() => {
    const columns: ColumnDef<LeaveAccrualFragment>[] = [
      {
        accessorKey: 'accrualDate',
        header: () => <span>Accrual Date</span>,
        cell: ({ row }) => {
          const value = row.getValue<Date>('accrualDate');

          return (
            <div className="font-bold">
              {dayjs(value).format('MMM DD, YYYY')}
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'accrualValue',
        header: () => <span>Accrued/Used</span>,
        cell: ({ row }) => {
          const value = row.getValue<number>('accrualValue');
          return (
            <div className={value > 0 ? 'text-green-500' : 'text-orange-500'}>
              {value > 0 ? `+${value}` : value}{' '}
              {`${Math.abs(value) === 1 ? 'day' : 'days'}`}
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'description',
        header: () => <span>Description/Category</span>,
        cell: ({ row }) => {
          const value =
            row.original.description || row.original.leaveCategoryName || 'N/A';
          return <div className="">{value}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'cancelReason',
        header: () => <span>Cancel Reason</span>,
        cell: ({ row }) => (
          <div className="">{row.getValue('cancelReason') || 'N/A'}</div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      ...(admin
        ? [
            {
              accessorKey: 'employeeId',
              header: ({
                column,
              }: HeaderContext<LeaveAccrualFragment, any>) => (
                <DataTableColumnHeader column={column} title="Employee" />
              ),
              cell: ({ row }: CellContext<LeaveAccrualFragment, any>) => {
                if (!row.original.employee) return null;
                return (
                  <div className="flex flex-row items-center gap-2">
                    <EmployeeAvatar
                      src={row.original.employee.profilePhotoUrl}
                      name={row.original.employee.name}
                      size="small"
                    />
                    <span className="ml-2 text-gray-500">
                      {row.original.employee.name}
                    </span>
                  </div>
                );
              },
              enableSorting: false,
              enableHiding: false,
              enableGrouping: true,
              aggregatedCell: ({
                row,
              }: CellContext<LeaveAccrualFragment, any>) => {
                if (!row.original.employee) return null;
                return (
                  <div className="flex flex-row items-center gap-2">
                    <EmployeeAvatar
                      src={row.original.employee.profilePhotoUrl}
                      name={row.original.employee.name}
                      size="small"
                    />

                    <span className="ml-2 text-gray-500">
                      {row.original.employee.name}
                    </span>
                  </div>
                );
              },
            },
          ]
        : []),
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
      {
        id: 'actions',
        header: () => null,
        cell: () => {
          return (
            <IconMenu
              buttonVariant="secondary"
              icon={<Icons.MoreHorizontal size={16} />}
              items={[
                {
                  label: 'Cancel',
                  onClick: () => {
                    console.log('test');
                  },
                },
              ]}
            />
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

const getBadgeVariantFromStatus = (status: string): BadgeProps['variant'] => {
  switch (status) {
    case LeaveAccrualStatus.ACCRUED:
      return 'primary';
    case LeaveAccrualStatus.EXPIRED:
      return 'secondary';
    case LeaveAccrualStatus.CANCELLED:
      return 'destructive_mild';
    default:
      return 'secondary';
  }
};
