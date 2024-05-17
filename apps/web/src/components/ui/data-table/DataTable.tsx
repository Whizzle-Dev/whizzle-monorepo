import * as React from 'react';
import { ReactNode, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  PaginationState,
  SortingState,
  Table as TableType,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader } from '@/components/ui/loader';
import {
  DataTableCell,
  getCommonPinningStyles,
} from '@/components/ui/data-table/DataTableCell';

interface DataTableProps<TData> {
  colSpan: number;
  loading?: boolean;
  table: TableType<TData>;
  withPagination?: boolean;
}

interface UseDataTableArgs<TData> {
  columns: ColumnDef<TData>[];
  data?: TData[];
  pagination?: PaginationState;
}
const stableArray: any = [] as const;

export const useDataTable = <TData,>({
  data,
  columns,
  pagination,
}: UseDataTableArgs<TData>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['expand-column'],
    right: ['actions-column'],
  });
  const table = useReactTable({
    data: data ?? stableArray,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      grouping,
      columnPinning,
      pagination,
    },
    autoResetExpanded: false,
    initialState: {
      expanded: true,
      columnPinning: {
        left: ['expand-column'],
        right: ['actions-column'],
      },
    },
    enableColumnPinning: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnPinningChange: setColumnPinning,
  });

  return {
    table,
  };
};

export function DataTable<TData>({
  colSpan,
  table,
  loading,
}: DataTableProps<TData>) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border max-w-full overflow-x-auto relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ ...getCommonPinningStyles(header.column) }}
                      className="relative"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            ) as ReactNode
                          }
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={colSpan} className="h-24">
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={row.getIsGrouped() ? 'bg-gray-50 p-4' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <DataTableCell
                        cell={cell}
                        row={row}
                        key={'cell_' + cell.id}
                      />
                    ))}
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell colSpan={colSpan} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
