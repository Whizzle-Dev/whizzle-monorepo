import { useGetCheckInTemplatesQuery } from '@/generated';

export const useCheckInsData = () => {
  const { data, loading, error } = useGetCheckInTemplatesQuery();
  const isSetup = Boolean(
    !loading && !error && data?.getCheckInTemplates.length,
  );

  const dailyCheckIn = data?.getCheckInTemplates.find(
    (checkIn) => checkIn.type === 'DAILY',
  );

  const weeklyCheckIn = data?.getCheckInTemplates.find(
    (checkIn) => checkIn.type === 'WEEKLY',
  );
  const monthlyCheckIn = data?.getCheckInTemplates.find(
    (checkIn) => checkIn.type === 'MONTHLY',
  );
  return {
    data,
    isSetup,
    loading,
    dailyCheckIn,
    weeklyCheckIn,
    monthlyCheckIn,
  };
};
