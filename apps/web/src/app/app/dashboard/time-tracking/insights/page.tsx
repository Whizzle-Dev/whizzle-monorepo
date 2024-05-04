'use client';
import React, { Suspense } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { TimePerProjectBarChart } from '@/domain/time-tracking/TimePerProjectBarChart';
import { TimePerTeamBarChart } from '@/domain/time-tracking/TimePerTeamBarChart';
import { TimePerEmployeeBarChart } from '@/domain/time-tracking/TimePerEmployeeBarChart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDateRangePicker } from '@/components/custom/DateRangePicker/CalendarDateRangePicker';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';

const Insights = () => {
  return (
    <Suspense>
      <div className="flex flex-col">
        <InsightsHeader />
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Time Tracked per Project</CardTitle>
            </CardHeader>
            <TimePerProjectBarChart />
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Time Tracked per Team</CardTitle>
            </CardHeader>
            <TimePerTeamBarChart />
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Time Tracked per Employee</CardTitle>
            </CardHeader>
            <TimePerEmployeeBarChart />
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default withAuth(Insights);

const InsightsHeader = () => {
  const { date, onChange: setDate } = useQueryDateRange();
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
      <CalendarDateRangePicker setDate={setDate} date={date} />
    </div>
  );
};
