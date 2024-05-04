import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TeamDto, useGetTeamsQuery } from '@/generated';
import { TeamsTableToolbar } from '@/domain/employees/TeamsTableToolbar';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { TeamsTableRowActions } from '@/domain/employees/teams/TeamsTableRowActions';

export const teamsTableColumns: ColumnDef<TeamDto>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  //   enableGrouping: false,
  // },
  {
    accessorKey: 'name',
    header: () => <span>Name</span>,
    cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
  {
    accessorKey: 'description',
    header: () => <span>Description</span>,
    cell: ({ row }) => (
      <div className="">{row.getValue('description') || 'N/A'}</div>
    ),
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
    cell: ({ row }) => <TeamsTableRowActions team={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
  },
];
const TeamsTable = () => {
  const { data, loading } = useGetTeamsQuery({
    fetchPolicy: 'cache-first',
  });

  const { table } = useDataTable({
    data: data?.teams,
    columns: teamsTableColumns,
  });

  return (
    <div className="gap-4 grid">
      <TeamsTableToolbar
        searchPlaceholder="Search teams..."
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
        colSpan={teamsTableColumns.length}
      />
    </div>
  );
};

export const TeamsView = () => {
  return <TeamsTable />;
};
