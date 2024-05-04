import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { addDays } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

type QuickFiltersProps = {
  setDate: (date: DateRange) => void;
};
export const QuickFilters = ({ setDate }: QuickFiltersProps) => {
  return (
    <div className="pb-2 px-2 gap-2 flex flex-row flex-wrap">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate({
            from: dayjs().startOf('day').toDate(),
            to: dayjs().endOf('day').toDate(),
          });
        }}
      >
        Today
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate({
            from: dayjs().startOf('week').toDate(),
            to: dayjs().endOf('week').toDate(),
          });
        }}
      >
        This Week
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate({
            from: dayjs().startOf('month').toDate(),
            to: dayjs().endOf('month').toDate(),
          });
        }}
      >
        This Month
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate({
            from: addDays(new Date(), -7),
            to: new Date(),
          });
        }}
      >
        Last 7 Days
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate({
            from: addDays(new Date(), -30),
            to: new Date(),
          });
        }}
      >
        Last 30 Days
      </Button>
    </div>
  );
};
