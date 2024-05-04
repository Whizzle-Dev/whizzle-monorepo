import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableType,
  GroupingState,
  getExpandedRowModel,
  getGroupedRowModel,
  Cell,
  Row,
  ColumnPinningState,
  Column,
  PaginationState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CSSProperties, ReactNode, useState } from 'react';
import { clsx } from 'clsx';
import { Icons } from '@/components/ui/icons';
import { Loader } from '@/components/ui/loader';

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
const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  if (isPinned)
    console.log({
      isPinned,
      isLastLeftPinnedColumn,
      isFirstRightPinnedColumn,
      column,
    });
  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px #d6d3d3 inset'
      : isFirstRightPinnedColumn
      ? '4px 0 4px -4px #d6d3d3 inset'
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    background: isPinned ? 'white' : undefined,
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
                      <Cell cell={cell} row={row} key={'cell_' + cell.id} />
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
type CellProps<TData> = {
  cell: Cell<TData, unknown>;
  row: Row<TData>;
};
const Cell = <TData,>({ cell, row }: CellProps<TData>) => {
  const isAggregated = cell.getIsAggregated();
  const isGrouped = cell.getIsGrouped();
  return (
    <TableCell
      className={clsx()}
      style={{ ...getCommonPinningStyles(cell.column) }}
    >
      {isGrouped ? (
        <>
          <button
            onClick={row.getToggleExpandedHandler()}
            className={clsx(
              'flex flex-row gap-2 whitespace-nowrap items-center',
              row.getCanExpand() ? 'cursor-pointer' : 'cursor-default',
            )}
          >
            {row.getIsExpanded() ? (
              <Icons.ChevronDown size={18} className="text-gray-500" />
            ) : (
              <Icons.ChevronRight size={18} className="text-gray-500" />
            )}{' '}
            {
              flexRender(
                cell.column.columnDef.aggregatedCell ??
                  cell.column.columnDef.cell,
                cell.getContext(),
              ) as ReactNode
            }{' '}
            ({row.subRows.length})
          </button>
        </>
      ) : // todo resolve this
      isAggregated ? (
        // If the cell is aggregated, use the Aggregated
        // renderer for cell
        <div className="p-4">{null}</div>
      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
        // Otherwise, just render the regular cell
        (flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode)
      )}
    </TableCell>
  );
};
