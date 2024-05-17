'use client';
import React, { Suspense } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import {
  GetTimeEntriesFilters,
  TimeEntryFragment,
  useGetCompanyTimeEntriesQuery,
  useTimeTrackingStatsQuery,
} from '@/generated';
import { useTimeTrackingColumns } from '@/domain/time-tracking/useTimeTrackingColumns';
import { TimeReportsTableToolbar } from '@/domain/time-tracking/TimeReportsTableToolbar';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';
import { NetworkStatus } from '@apollo/client';
import { Icons } from '@/components/ui/icons';
import { SummaryBox } from '@/components/custom/SummaryBox';
import { DataTableLoadMore } from '@/components/ui/data-table/DataTableLoadMore';

import { EmployeeAvatar } from '@/components/ui/avatar';
import { Loader } from '@/components/ui/loader';

const PageTitle = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-bold tracking-tight">Time Reports</h2>
      <div className="flex items-center space-x-2">
        <Button>Export Data</Button>
      </div>
    </div>
  );
};
const PageSummaries = () => {
  const timeTrackingStatsQuery = useTimeTrackingStatsQuery();

  const trackedHours = Math.round(
    (timeTrackingStatsQuery.data?.timeTrackingStats.totalMinutesThisWeek ?? 0) /
      60,
  );
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryBox
          name="Most Active Employees"
          title={
            <div className="mb-2 flex items-center gap-2">
              {timeTrackingStatsQuery.loading ? (
                <Loader />
              ) : (
                timeTrackingStatsQuery.data?.timeTrackingStats.mostActiveEmployees.map(
                  (employee) => (
                    <EmployeeAvatar
                      key={employee.id}
                      src={employee.profilePhotoUrl}
                      name={employee.name}
                    />
                  ),
                )
              )}
            </div>
          }
          description={timeTrackingStatsQuery.data?.timeTrackingStats.mostActiveEmployees
            .map((e) => e.name)
            .join(', ')}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <SummaryBox
          name="Hours This Week"
          title={
            timeTrackingStatsQuery.loading ? <Loader /> : `${trackedHours}h`
          }
          description={
            !timeTrackingStatsQuery.loading
              ? timeTrackingStatsQuery.data?.timeTrackingStats
                  .minutesPercentageDiffFromLastWeek
              : null
          }
          icon={<Icons.Clock className="text-gray-500" size={14} />}
        />

        <SummaryBox
          name="Trending Project This Week"
          title={
            timeTrackingStatsQuery.loading ? (
              <Loader />
            ) : (
              `${
                timeTrackingStatsQuery.data?.timeTrackingStats.trendingProject
                  ?.project.name ?? 'N/A'
              }`
            )
          }
          description={
            timeTrackingStatsQuery.loading
              ? null
              : `${
                  (timeTrackingStatsQuery.data?.timeTrackingStats
                    .trendingProject?.totalMinutes ?? 0) / 60 ?? 'N/A'
                }h tracked`
          }
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
      </div>
      <Separator className="my-6" />
    </>
  );
};
const PER_PAGE = 20;

const Reports = () => {
  const columns = useTimeTrackingColumns({
    employeeColumn: true,
  });

  const [teamIds] = useQueryState('teamIds', parseAsArrayOf(parseAsInteger)); // state is number[]
  const [employeeIds] = useQueryState(
    'employeeIds',
    parseAsArrayOf(parseAsInteger),
  );
  const [projectIds] = useQueryState(
    'projectIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [taskIds] = useQueryState('taskIds', parseAsArrayOf(parseAsInteger));

  const { date } = useQueryDateRange();
  const filters: GetTimeEntriesFilters = {};
  if (teamIds?.length) {
    filters['teamIds'] = teamIds;
  }
  if (employeeIds?.length) {
    filters['employeeIds'] = employeeIds;
  }
  if (projectIds?.length) {
    filters['projectIds'] = projectIds;
  }
  if (taskIds?.length) {
    filters['taskIds'] = taskIds;
  }

  if (date?.from && date?.to) {
    filters['dateRange'] = {
      from: date.from,
      to: date.to,
    };
  }

  const timeEntriesQuery = useGetCompanyTimeEntriesQuery({
    variables: {
      filters,
      options: {
        skip: 0,
        take: PER_PAGE,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { table } = useDataTable<TimeEntryFragment>({
    data: timeEntriesQuery?.data?.companyTimeEntries.data,
    columns,
  });

  const count = timeEntriesQuery?.data?.companyTimeEntries.data.length ?? 0;
  const loadMore = () => {
    timeEntriesQuery.fetchMore({
      variables: {
        options: {
          skip: count,
          take: PER_PAGE,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          companyTimeEntries: {
            ...fetchMoreResult.companyTimeEntries,
            data: [
              ...(prev.companyTimeEntries.data ?? []),
              ...fetchMoreResult.companyTimeEntries.data,
            ],
          },
        };
      },
    });
  };
  const hasMore = timeEntriesQuery?.data?.companyTimeEntries.hasNextPage;
  return (
    <div className="flex flex-col gap-2 mt-4">
      <TimeReportsTableToolbar table={table} />
      <DataTable
        colSpan={columns.length}
        table={table}
        loading={timeEntriesQuery.loading}
      />
      <DataTableLoadMore
        totalCount={timeEntriesQuery?.data?.companyTimeEntries.totalCount}
        loadedCount={count}
        canLoadMore={hasMore}
        loadingMore={timeEntriesQuery.networkStatus === NetworkStatus.fetchMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <PageTitle />
      <PageSummaries />
      <Reports />
    </Suspense>
  );
};

export default withAuth(Page);
