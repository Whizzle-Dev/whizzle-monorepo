'use client';

import { useMemo } from 'react';
import { useGetAbsentEmployeesQuery } from '@/generated';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { Loader } from '@/components/ui/loader';
import { EmployeeAvatar } from '@/components/ui/avatar';
import { dayjs } from '@/lib/date';

export const WhoIsAbsentCard = () => {
  const variables = useMemo(
    () => ({
      toDate: dayjs().endOf('month').toDate(),
      fromDate: dayjs().toDate(),
    }),
    [],
  );
  const { data, loading } = useGetAbsentEmployeesQuery({
    variables,
    fetchPolicy: 'cache-first',
  });

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Who is Absent This Month?</CardTitle>
          <Button variant="outline" asChild>
            <Link href="/app/dashboard/pto/absence-calendar" className="gap-2">
              Absence Calendar{' '}
              <Icons.CalendarDays className="text-gray-500" size={16} />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {loading && <Loader />}
        {data?.absentEmployees.employees.map((employee) => (
          <div key={employee.id} className="flex items-center">
            <EmployeeAvatar
              src={employee.profilePhotoUrl}
              name={employee.requestedByName}
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {employee.requestedByName} on{' '}
                <strong>{employee.leaveCategoryName}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                From{' '}
                <strong>{dayjs(employee.startDate).format('MMM DD')}</strong> to{' '}
                <strong>{dayjs(employee.endDate).format('MMM DD')}</strong>
              </p>
            </div>
          </div>
        ))}
        {(data?.absentEmployees.totalCount ?? 0) > 6 && (
          <Button variant="outline" asChild className="w-fit">
            <Link href="/app/dashboard/pto/absence-calendar" className="gap-2">
              {`${(data?.absentEmployees.totalCount ?? 0) - 6} more - View All`}
            </Link>
          </Button>
        )}
        {!loading && !data?.absentEmployees.employees.length && (
          <CardDescription>No one absent this month.</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
