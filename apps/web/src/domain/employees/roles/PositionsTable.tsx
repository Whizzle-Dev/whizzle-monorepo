import { RoleDto, useGetRolesQuery } from '@/generated';
import * as React from 'react';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { RolesTableToolbar } from '@/domain/employees/roles/RolesTableToolbar';
import { RolesTableRowActions } from '@/domain/employees/roles/RolesTableRowActions';

const rolesTableColumns: ColumnDef<RoleDto>[] = [
  {
    accessorKey: 'name',
    header: () => <span>Position Name</span>,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
  {
    accessorKey: 'description',
    header: () => <span>Position Description</span>,
    cell: ({ row }) => <div>{row.getValue('description') || 'N/A'}</div>,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
  {
    accessorKey: 'numberOfEmployees',
    header: () => <span>Number of Employees</span>,
    cell: ({ row }) => (
      <div className="">{row.getValue('numberOfEmployees')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <RolesTableRowActions role={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
];
export const PositionsTable = () => {
  const { data, loading } = useGetRolesQuery({
    fetchPolicy: 'cache-first',
  });

  const { table } = useDataTable({
    data: data?.roles,
    columns: rolesTableColumns,
  });

  return (
    <div className="gap-4 grid">
      <RolesTableToolbar
        searchPlaceholder="Search positions..."
        searchValue={
          (table.getColumn('name')?.getFilterValue() as string) ?? ''
        }
        onSearchChange={(value) =>
          table.getColumn('name')?.setFilterValue(value)
        }
      />
      <DataTable
        loading={loading}
        table={table}
        colSpan={rolesTableColumns.length}
      />
    </div>
  );
};
