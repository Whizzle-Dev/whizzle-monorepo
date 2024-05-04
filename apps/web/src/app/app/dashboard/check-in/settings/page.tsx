'use client';
import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { useCheckInsData } from '@/domain/check-in/hooks/useCheckInsData';
import { AvailableCheckInsForSetup } from '@/domain/check-in/manage/AvailableCheckInsForSetup';
import { SetupCheckInsView } from '@/domain/check-in/SetupCheckInsView';

function Settings() {
  const { isSetup, dailyCheckIn, weeklyCheckIn, monthlyCheckIn } =
    useCheckInsData();
  return (
    <>
      <h2 className="text-2xl font-bold">Check-in settings</h2>
      <Separator className="my-6" />

      {isSetup ? (
        <AvailableCheckInsForSetup
          hasDaily={!!dailyCheckIn}
          hasMonthly={!!monthlyCheckIn}
          hasWeekly={!!weeklyCheckIn}
          dailyCheckIn={dailyCheckIn}
          weeklyCheckIn={weeklyCheckIn}
          monthlyCheckIn={monthlyCheckIn}
        />
      ) : (
        <SetupCheckInsView />
      )}
    </>
  );
}

export default withAuth(Settings);
