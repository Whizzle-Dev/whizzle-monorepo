import { useRouter, useSearchParams } from 'next/navigation';
import { Icons } from '@/components/ui/icons';
import { CheckInTemplateModel, CheckInType } from '@/generated';
import { clsx } from 'clsx';
import { useCallback } from 'react';

type AvailableCheckInsForSetupProps = {
  hasDaily?: boolean;
  hasWeekly?: boolean;
  hasMonthly?: boolean;
  dailyCheckIn?: CheckInTemplateModel;
  weeklyCheckIn?: CheckInTemplateModel;
  monthlyCheckIn?: CheckInTemplateModel;
};
export const AvailableCheckInsForSetup = ({
  hasDaily = false,
  hasWeekly = false,
  hasMonthly = false,
  dailyCheckIn,
  weeklyCheckIn,
  monthlyCheckIn,
}: AvailableCheckInsForSetupProps) => {
  return (
    <div className="flex flex-col flex-wrap gap-4 mt-8">
      <CheckInItem
        description="Set up a daily check-in template for employees to share their day-to-day progress and insights, fostering a sense of daily accomplishment and team communication."
        type={CheckInType.DAILY}
        configured={hasDaily}
        template={dailyCheckIn}
      />
      <CheckInItem
        description="Establish a weekly check-in template to encourage employees to reflect on their weekly achievements, challenges, and upcoming goals, promoting a strategic overview of team activities."
        type={CheckInType.WEEKLY}
        configured={hasWeekly}
        template={weeklyCheckIn}
      />
      <CheckInItem
        description="Initiate a monthly check-in template to gather comprehensive insights into employees monthly accomplishments, perspectives, and long-term goals, promoting strategic alignment within the team."
        type={CheckInType.MONTHLY}
        configured={hasMonthly}
        template={monthlyCheckIn}
      />
    </div>
  );
};

type CreateCheckInProps = {
  description: string;
  type: CheckInType;
  configured: boolean;
  template?: CheckInTemplateModel;
};

const CheckInItem = ({
  description,
  type,
  configured,
  template,
}: CreateCheckInProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (obj: Record<string, any>) => {
      const params = new URLSearchParams(searchParams?.toString());

      Object.entries(obj).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      return params.toString();
    },
    [searchParams],
  );
  return (
    <button
      className={clsx(
        'border rounded flex flex-row p-4 items-center max-w-xl align-left',
      )}
      onClick={() => {
        router.push(
          '/app/check-in/create?' +
            createQueryString({
              type,
              configured: configured.toString(),
              id: template?.id?.toString(),
              formElements: template?.formElements,
            }),
        );
      }}
    >
      <div className="flex flex-col gap-4 w-10/12">
        <span className="text-left font-bold">
          {configured ? 'Manage' : 'Create'}{' '}
          <span className="capitalize">{type.toLowerCase()}</span> Check-in
        </span>
        <span className="text-left">{description}</span>
      </div>
      <div className="w-2/12 flex items-center justify-end">
        {configured ? (
          <Icons.CheckCircle2 className="stroke-green-600" />
        ) : (
          <Icons.ArrowRightCircle className="stroke-gray-600" />
        )}
      </div>
    </button>
  );
};
