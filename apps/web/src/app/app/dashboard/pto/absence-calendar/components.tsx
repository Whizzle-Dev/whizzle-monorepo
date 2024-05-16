import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  PtoRequestStatus,
  useGetPtoRequestsForCompanyQuery,
  useGetRolesQuery,
  useGetTeamsQuery,
} from '@/generated';
import { cn } from '@/lib/utils';
import isBetween from 'dayjs/plugin/isBetween';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { FilterButtonDropdown } from '@/components/ui/menues/FilterButtonDropdown';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { PtoRequestDetailsDialog } from '@/app/app/dashboard/pto/request-timeof/PtoRequestDetailsDialog';

dayjs.extend(isBetween);

type CalendarHeaderProps = {
  currentDate: dayjs.Dayjs;
  setCurrentDate: (date: dayjs.Dayjs) => void;
};
const CalendarHeader = ({
  currentDate,
  setCurrentDate,
}: CalendarHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-4">
      <h1 className="text-lg font-bold leading-6 text-gray-900">
        Absence Calendar
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            {currentDate.format('MMMM YYYY')}
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          <button
            onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="relative ml-6 md:hidden">
          <button
            type="button"
            className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
            id="menu-0-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
type CalendarCellProps = {
  isCurrentMonth: boolean;
  day: Dayjs;
  events: Event[];
  onView: (id: number) => void;
};
type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
};
const CalendarCell = ({
  isCurrentMonth,
  day,
  events = [],
  onView,
}: CalendarCellProps) => {
  const allEvents = events.filter((event) => {
    // check if the event interval goes through today(day) check also if the day is bettween the start and end
    return dayjs(day).isBetween(
      dayjs(event.start).startOf('day'),
      dayjs(event.end).endOf('day'),
      'day',
      '[]',
    );
  });
  return (
    <div
      className={cn(
        'relative  text-gray-500 hover:bg-gray-100 h-[140px]',
        isCurrentMonth ? 'bg-white' : 'bg-gray-50',
      )}
    >
      <span
        className={cn(
          ' mx-3 my-2',
          dayjs().isSame(day, 'day') ? 'font-bold' : '',
        )}
      >
        {day.get('date')}
      </span>

      {allEvents.length > 0 &&
        allEvents
          .sort((v, v2) => (v.color > v2.color ? -1 : 1))
          .map((event) => (
            <div
              key={event.id}
              data-key={event.title}
              className={cn(
                'w-full h-[18px] text-xs text-white cursor-pointer overflow-ellipsis whitespace-nowrap',
                event.color,
              )}
              onClick={() => onView(event.id)}
            >
              {dayjs(event.start).isSame(day, 'day') && event.title}
            </div>
          ))}
    </div>
  );
};
const allowedColors = [
  'bg-[#17301C]',
  'bg-[#379392]',
  'bg-[#4FB0C6]',
  'bg-[#744FC6]',
  'bg-[#355070]',
  'bg-[#B56576]',
  'bg-[#6D597A]',
  'bg-[#4F86C6]',
];
const getRandomColorForId = (id: number) => {
  return allowedColors[id % allowedColors.length];
};
const totalCells = 42;
export const CalendarTw = () => {
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const firstDayOfMonth = currentDate.startOf('month');

  // Get the number of days in the current month
  const daysInMonth = currentDate.daysInMonth();

  const daysFromPrevMonth = firstDayOfMonth.day();

  const daysFromNextMonth = totalCells - (daysInMonth + daysFromPrevMonth);

  const currentMonthDates = Array.from({ length: daysInMonth }, (_, index) =>
    firstDayOfMonth.add(index, 'day'),
  );

  const prevMonthDates = Array.from({ length: daysFromPrevMonth }, (_, index) =>
    firstDayOfMonth.subtract(index + 1, 'day'),
  ).reverse();

  const nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, index) =>
    // @ts-expect-error no worries
    currentMonthDates[currentMonthDates.length - 1].add(index + 1, 'day'),
  );

  const allDates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];

  const [teamIds] = useQueryState('teamIds', parseAsArrayOf(parseAsInteger));

  const [employeeIds] = useQueryState(
    'employeeIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [roleIds] = useQueryState('roleIds', parseAsArrayOf(parseAsInteger));

  const { data } = useGetPtoRequestsForCompanyQuery({
    variables: {
      filters: {
        status: PtoRequestStatus.APPROVED,
        // startDate: currentDate.startOf('month').toDate(),
        // endDate: currentDate.endOf('month').toDate(),
        teamIds: teamIds,
        employeeIds: employeeIds,
        roleIds: roleIds,
      },
    },
  });

  const [requestDetailsId, setRequestDetailsId] = React.useState<number | null>(
    null,
  );
  return (
    <>
      <div className="flex h-full flex-col">
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <AbsenceCalendarFilters />
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
            <div className="flex justify-center bg-white py-2">
              <span>Monday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Tuesday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Wednesday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Thursday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Friday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Saturday</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>Sunday</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">
              {/*list all days from current month*/}
              {allDates.map((day) => (
                <CalendarCell
                  key={day.format('YYYY-MM-DD')}
                  isCurrentMonth={currentDate.isSame(day, 'month')}
                  day={day}
                  events={
                    data?.getPtoRequestsForCompany.map((request) => ({
                      id: request.id,
                      title: `${request.requestedByName} (${request.leaveCategoryName})`,
                      start: request.startDate,
                      end: request.endDate,
                      color: getRandomColorForId(request.id) ?? '',
                    })) ?? []
                  }
                  onView={(id) => {
                    setRequestDetailsId(id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {requestDetailsId && (
        <PtoRequestDetailsDialog
          onOpenChange={(open) => {
            if (!open) {
              setRequestDetailsId(null);
            }
          }}
          requestId={requestDetailsId}
        />
      )}
    </>
  );
};

const AbsenceCalendarFilters = () => {
  const [teamIds, setTeamIds] = useQueryState(
    'teamIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [employeeIds, setEmployeeIds] = useQueryState(
    'employeeIds',
    parseAsArrayOf(parseAsInteger),
  );

  const [roleIds, setRoleIds] = useQueryState(
    'roleIds',
    parseAsArrayOf(parseAsInteger),
  );
  const teamsData = useGetTeamsQuery();
  const employeeOptions = useEmployeeSelectOptions();

  const rolesQu = useGetRolesQuery();
  const rolesItems = rolesQu.data?.roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));
  const hasActiveFilter = Boolean(
    teamIds?.length || employeeIds?.length || roleIds?.length,
  );

  return (
    <div className="flex items-center gap-2 flex-wrap my-4">
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
        label="Position"
        activeItems={roleIds ?? []}
        items={rolesItems ?? []}
        onChange={(item) => {
          setRoleIds((prev) => {
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
              setRoleIds(null);
            }}
          >
            Reset Filters
            <Icons.XCircle size={16} className="text-gray-500 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
