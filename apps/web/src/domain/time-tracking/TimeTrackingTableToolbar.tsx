import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/data-table/DataTableViewOptions';
import React from 'react';
import { Table } from '@tanstack/react-table';
import { TimeEntryFragment } from '@/generated';
import { FilterButtonDropdown } from '@/components/ui/menues/FilterButtonDropdown';
import { Icons } from '@/components/ui/icons';

interface TimeTrackingTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  table: Table<TimeEntryFragment>;
}

export const TimeTrackingTableToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  table,
}: TimeTrackingTableToolbarProps) => {
  const grouping = table.getState().grouping;
  const items = table
    .getAllColumns()
    .filter((column) => column.getCanGroup())
    .map((column) => ({
      value: column.id,
      label: column.id,
    }));

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <FilterButtonDropdown
        icon={<Icons.Menu size={16} />}
        label="Group By"
        activeItems={grouping}
        items={items}
        onChange={(item) => {
          const column = table.getColumn(item.value);
          column?.toggleGrouping();
        }}
      />
      <DataTableViewOptions table={table} />
    </div>
  );
};
