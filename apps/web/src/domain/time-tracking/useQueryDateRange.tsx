import { parseAsIsoDateTime, useQueryState } from 'nuqs';
import { DateRange } from 'react-day-picker';

export const useQueryDateRange = () => {
  const [startDate, setStartDate] = useQueryState(
    'startDate',
    parseAsIsoDateTime,
  ); // state is a Date
  const [endDate, setEndDate] = useQueryState('endDate', parseAsIsoDateTime); // state is a Date

  const date = { from: startDate || undefined, to: endDate || undefined };
  const onChange = (value?: DateRange) => {
    setStartDate(value?.from ?? null);
    setEndDate(value?.to ?? null);
  };

  return { date, onChange };
};
