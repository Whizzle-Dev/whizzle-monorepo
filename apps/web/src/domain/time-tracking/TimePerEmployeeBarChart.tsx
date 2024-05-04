import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DateRangeInput, useTimeTrackedPerEmployeeQuery } from '@/generated';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';

export const TimePerEmployeeBarChart = () => {
  const { date } = useQueryDateRange();
  const dateRange: DateRangeInput = {};
  if (date.from && date.to) {
    dateRange.from = date.from;
    dateRange.to = date.to;
  }

  const query = useTimeTrackedPerEmployeeQuery({ variables: { dateRange } });
  const data = query.data?.timeTrackedPerEmployee.map((item) => {
    return {
      id: item.employee.id,
      name: item.employee.name,
      timeTracked: item.totalMinutes,
    };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="timeTracked" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="timeTracked"
          className="fill-gray-500"
          name="Minutes Tracked"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
