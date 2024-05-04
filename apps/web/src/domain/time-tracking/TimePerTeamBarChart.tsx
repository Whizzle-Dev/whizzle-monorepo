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
import { DateRangeInput, useTimeTrackedPerTeamQuery } from '@/generated';
import { useQueryDateRange } from '@/domain/time-tracking/useQueryDateRange';

export const TimePerTeamBarChart = () => {
  const { date } = useQueryDateRange();
  const dateRange: DateRangeInput = {};
  if (date.from && date.to) {
    dateRange.from = date.from;
    dateRange.to = date.to;
  }
  const query = useTimeTrackedPerTeamQuery({ variables: { dateRange } });
  const data = query.data?.timeTrackedPerTeam.map((team) => {
    return {
      id: team.team.id,
      name: team.team.name,
      timeTracked: team.totalMinutes,
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
