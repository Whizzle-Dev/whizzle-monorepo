import { ColumnDef } from '@tanstack/react-table';
import {
  EmployeeFragment,
  EmployeeStatus,
  PermissionRoleEnum,
  useGetEmployeesQuery,
} from '@/generated';
import { Checkbox } from '@/components/ui/checkbox';
import * as React from 'react';
import { EmployeesTableToolbar } from '@/domain/employees/EmployeesTableToolbar';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { Badge } from '@/components/ui/badge';
import { EmployeesTableRowActions } from '@/domain/employees/EmployeesTableRowActions';
import { DataTableColumnHeader } from '@/components/ui/data-table/DataTableColumnHeader';
import { ExpiredInvitationColumn } from '@/domain/employees/ExpiredInvitationColumn';

import { EmployeeAvatar } from '@/components/ui/avatar';

export const columns: ColumnDef<EmployeeFragment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableGrouping: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <span>Name</span>,
    cell: ({ row }) => (
      <div className="w-[200px] flex flex-row justify-between gap-4">
        <span>{row.getValue('name')}</span>
        <EmployeeAvatar
          src={row.original.profilePhotoUrl}
          name={row.original.name}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
  {
    accessorKey: 'email',
    header: () => <span>Email</span>,
    cell: ({ row }) => {
      return row.getValue('email');
    },
    enableGrouping: false,
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    id: 'Role',
    accessorFn: (row) => row.role?.name ?? 'N/A',
    header: ({ column }) => (
      <DataTableColumnHeader title="Position" column={column} />
    ),
    cell: ({ row }) => {
      return row.original.role?.name ?? 'N/A';
    },
    enableGrouping: true,
    enableSorting: false,
  },
  {
    accessorKey: 'permissionRole',
    id: 'Permission',
    header: () => <span>Permission</span>,
    cell: ({ row }) => {
      return prettyPrintRole(row.original.permissionRole);
    },
    enableGrouping: true,
    enableSorting: false,
  },
  {
    accessorKey: 'team',
    accessorFn: (row) => row.team?.name ?? 'N/A',
    id: 'Team',
    header: ({ column }) => (
      <DataTableColumnHeader title="Team" column={column} />
    ),
    cell: ({ row }) => {
      return row.original.team?.name ?? 'N/A';
    },
    enableGrouping: true,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: () => <span>Status</span>,
    cell: ({ row }) => {
      const status = row.getValue('status');
      if (status === EmployeeStatus.ACTIVE) {
        return <Badge variant="primary">Active</Badge>;
      }
      if (status === EmployeeStatus.INVITED) {
        return <Badge variant="warning">Pending Invitation</Badge>;
      }
      if (status === EmployeeStatus.EXPIRED) {
        return <ExpiredInvitationColumn id={row.original.id} />;
      }
      if (status === EmployeeStatus.DISMISSED) {
        return <Badge variant="outline">Dismissed</Badge>;
      }
      return row.getValue('status');
    },
    enableGrouping: true,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <EmployeesTableRowActions employee={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
];

export const EmployeesView = () => {
  return <EmployeesTable />;
};

const EmployeesTable = () => {
  const { data, loading } = useGetEmployeesQuery({
    fetchPolicy: 'cache-first',
  });

  const { table } = useDataTable({ data: data?.employees, columns });

  return (
    <div className="gap-4 grid">
      <EmployeesTableToolbar
        searchPlaceholder="Search employees..."
        searchValue={
          (table.getColumn('name')?.getFilterValue() as string) ?? ''
        }
        onSearchChange={(value) =>
          table.getColumn('name')?.setFilterValue(value)
        }
        table={table}
      />
      <DataTable loading={loading} table={table} colSpan={columns.length} />
    </div>
  );
};

const prettyPrintRole = (role: PermissionRoleEnum) => {
  switch (role) {
    case PermissionRoleEnum.ACCOUNT_OWNER:
      return 'Account Owner';
    case PermissionRoleEnum.ADMIN:
      return 'Admin';
    case PermissionRoleEnum.MANAGER:
      return 'Manager';
    case PermissionRoleEnum.EMPLOYEE:
      return 'Employee';
    default:
      return 'N/A';
  }
};
