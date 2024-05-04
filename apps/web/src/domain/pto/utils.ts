import dayjs from 'dayjs';
import { PtoRequestStatus } from '@/generated';
import { BadgeProps } from '@/components/ui/badge';

export const formatLeaveRequestTime = (
  startDate: Date,
  endDate: Date,
  workingDays?: number,
) => {
  return `${dayjs(startDate).format('DD MMM')} - ${dayjs(endDate).format(
    'DD MMM',
  )} ${workingDays ? `(${workingDays} days)` : ''}`;
};
export const getBadgeVariantFromStatus = (
  status: PtoRequestStatus,
): BadgeProps['variant'] => {
  switch (status) {
    case PtoRequestStatus.APPROVED:
      return 'primary';
    case PtoRequestStatus.PENDING:
      return 'warning';
    case PtoRequestStatus.CANCELLED:
      return 'secondary';
    case PtoRequestStatus.REJECTED:
      return 'destructive_mild';
    default:
      return 'secondary';
  }
};
