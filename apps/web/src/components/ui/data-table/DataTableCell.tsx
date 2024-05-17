import { Cell, Column, flexRender, Row } from '@tanstack/react-table';
import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { TableCell } from '@/components/ui/table';
import { clsx } from 'clsx';
import { Icons } from '@/components/ui/icons';

type DataTableCellProps<TData> = {
  cell: Cell<TData, unknown>;
  row: Row<TData>;
};
export const DataTableCell = <TData,>({
  cell,
  row,
}: DataTableCellProps<TData>) => {
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
      ) : isAggregated ? (
        (flexRender(
          cell.column.columnDef.aggregatedCell,
          cell.getContext(),
        ) as ReactNode)
      ) : cell.getIsPlaceholder() ? null : (
        (flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode)
      )}
    </TableCell>
  );
};

export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
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
