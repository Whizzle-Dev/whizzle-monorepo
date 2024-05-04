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
import { DateRangeInput, useTimeTrackedPerProjectQuery } from '@/generated';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';

export const TimePerProjectBarChart = () => {
  const { date } = useQueryDateRange();
  const dateRange: DateRangeInput = {};
  if (date.from && date.to) {
    dateRange.from = date.from;
    dateRange.to = date.to;
  }
  const query = useTimeTrackedPerProjectQuery({ variables: { dateRange } });

  const data = query.data?.timeTrackedPerProject.map((project) => {
    return {
      id: project.project.id,
      name: project.project.name,
      timeTracked: project.totalMinutes,
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
          name="Minutes Tracked"
          className="fill-gray-500"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
