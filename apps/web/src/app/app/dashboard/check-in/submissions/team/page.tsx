'use client';

import { withAuth } from '@/domain/auth/withAuth';
import {
  CheckInSubmissionStatus,
  useGetCheckInsForCompanyQuery,
  useGetTeamsQuery,
} from '@/generated';
import { useCheckInTableColumns } from '@/domain/check-in/hooks/useCheckInTableColumns';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';

import * as React from 'react';
import { FilterButtonDropdown } from '@/components/ui/menues/FilterButtonDropdown';
import { parseAsInteger, useQueryState } from 'nuqs';
import { parseAsStringEnum } from 'nuqs/parsers';
import { Suspense } from 'react';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

const dropdownItems = [
  {
    label: 'Pending',
    value: CheckInSubmissionStatus.PENDING,
  },
  {
    label: 'Submitted',
    value: CheckInSubmissionStatus.SUBMITTED,
  },
  {
    label: 'Expired',
    value: CheckInSubmissionStatus.EXPIRED,
  },
];
const TeamCheckInsPage = () => {
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<CheckInSubmissionStatus>([
      CheckInSubmissionStatus.SUBMITTED,
      CheckInSubmissionStatus.PENDING,
      CheckInSubmissionStatus.EXPIRED,
    ]),
  );

  const [teamId, setTeamId] = useQueryState('teamId', parseAsInteger);

  const teamsData = useGetTeamsQuery();

  const filters =
    status || teamId
      ? {
          status,
          teamId,
        }
      : undefined;

  const columns = useCheckInTableColumns();
  const { data, loading } = useGetCheckInsForCompanyQuery({
    variables: {
      filters,
    },
  });
  const { table } = useDataTable({
    data: data?.getCompanyCheckIns,
    columns,
  });

  const hasActiveFilter = status || teamId;
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <FilterButtonDropdown
          icon={<Icons.Filter size={16} />}
          label="Status"
          activeItems={status ? [status] : []}
          items={dropdownItems}
          onChange={(item) => {
            setStatus(item.value as any);
          }}
        />
        <FilterButtonDropdown
          icon={<Icons.Filter size={16} />}
          label="Team"
          activeItems={teamId ? [teamId.toString()] : []}
          items={
            teamsData.data?.teams.map((team) => ({
              label: team.name,
              value: team.id.toString(),
            })) ?? []
          }
          onChange={(item) => {
            setTeamId(Number(item.value));
          }}
        />
        <div className="flex w-fit flex-row gap-2 items-center ml-auto">
          {hasActiveFilter && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setStatus(null);
                setTeamId(null);
              }}
            >
              Reset Filters
              <Icons.XCircle size={16} className="text-gray-500 ml-2" />
            </Button>
          )}
        </div>
      </div>
      <DataTable table={table} colSpan={columns.length} loading={loading} />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <TeamCheckInsPage />
    </Suspense>
  );
};

export default withAuth(Page);
