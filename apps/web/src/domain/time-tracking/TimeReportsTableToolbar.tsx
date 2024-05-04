import { DataTableViewOptions } from '@/components/ui/data-table/DataTableViewOptions';
import React from 'react';
import { Table } from '@tanstack/react-table';
import {
  TimeEntryFragment,
  useGetProjectsQuery,
  useGetTasksQuery,
  useGetTeamsQuery,
} from '@/generated';
import { FilterButtonDropdown } from '@/components/ui/menues/FilterButtonDropdown';
import { Icons } from '@/components/ui/icons';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { Button } from '@/components/ui/button';
import { CalendarDateRangePicker } from '@/components/custom/DateRangePicker/CalendarDateRangePicker';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';

interface TimeReportsTableToolbarProps {
  table: Table<TimeEntryFragment>;
}

export const TimeReportsTableToolbar = ({
  table,
}: TimeReportsTableToolbarProps) => {
  const grouping = table.getState().grouping;
  const items = table
    .getAllColumns()
    .filter((column) => column.getCanGroup())
    .map((column) => ({
      value: column.id,
      label: column.id,
    }));

  const [teamIds, setTeamIds] = useQueryState(
    'teamIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [employeeIds, setEmployeeIds] = useQueryState(
    'employeeIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [projectIds, setProjectIds] = useQueryState(
    'projectIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [taskIds, setTaskIds] = useQueryState(
    'taskIds',
    parseAsArrayOf(parseAsInteger),
  );

  const teamsData = useGetTeamsQuery();

  const employeeOptions = useEmployeeSelectOptions();

  const projectsQuery = useGetProjectsQuery();
  const projectItems = projectsQuery.data?.projects.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const tasksQuery = useGetTasksQuery();

  const { date, onChange: setDate } = useQueryDateRange();
  const hasActiveFilter = Boolean(
    teamIds?.length ||
      employeeIds?.length ||
      projectIds?.length ||
      taskIds?.length ||
      (date.from && date.to),
  );
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <CalendarDateRangePicker date={date} setDate={setDate} buttonSize="sm" />
      <FilterButtonDropdown
        icon={<Icons.Component size={16} />}
        label="Group By"
        activeItems={grouping}
        items={items}
        onChange={(item) => {
          const column = table.getColumn(item.value);
          column?.toggleGrouping();
        }}
      />
      <FilterButtonDropdown
        icon={<Icons.Filter size={16} />}
        label="Team"
        activeItems={teamIds ?? []}
        items={
          teamsData.data?.teams.map((team) => ({
            label: team.name,
            value: team.id,
          })) ?? []
        }
        onChange={(item) => {
          setTeamIds((prev) => {
            if (prev && prev.includes(item.value)) {
              return prev.filter((id) => id !== item.value);
            }
            return [...(prev ?? []), item.value];
          });
        }}
      />
      <FilterButtonDropdown
        icon={<Icons.Filter size={16} />}
        label="Employee"
        activeItems={employeeIds ?? []}
        items={employeeOptions}
        onChange={(item) => {
          setEmployeeIds((prev) => {
            if (prev && prev.includes(item.value)) {
              return prev.filter((id) => id !== item.value);
            }
            return [...(prev ?? []), item.value];
          });
        }}
      />
      <FilterButtonDropdown
        icon={<Icons.Filter size={16} />}
        label="Project"
        activeItems={projectIds ?? []}
        items={projectItems ?? []}
        onChange={(item) => {
          setProjectIds((prev) => {
            if (prev && prev.includes(item.value)) {
              return prev.filter((id) => id !== item.value);
            }
            return [...(prev ?? []), item.value];
          });
        }}
      />
      <FilterButtonDropdown
        icon={<Icons.Filter size={16} />}
        label="Task"
        activeItems={taskIds ?? []}
        items={
          tasksQuery.data?.tasks.map((team) => ({
            label: team.name,
            value: team.id,
          })) ?? []
        }
        onChange={(item) => {
          setTaskIds((prev) => {
            if (prev && prev.includes(item.value)) {
              return prev.filter((id) => id !== item.value);
            }
            return [...(prev ?? []), item.value];
          });
        }}
      />
      <div className="flex w-fit flex-row gap-2 items-center ml-auto">
        {hasActiveFilter && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTeamIds(null);
              setEmployeeIds(null);
              setProjectIds(null);
              setTaskIds(null);
              setDate({
                from: undefined,
                to: undefined,
              });
            }}
          >
            Reset Filters
            <Icons.XCircle size={16} className="text-gray-500 ml-2" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};
