'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { dayjs } from '@/lib/date';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { PtoRequestDetailsDialog } from '@/app/app/dashboard/pto/request-timeof/PtoRequestDetailsDialog';

type NotificationItemProps = {
  title: string;
  time: Date;
  id: number;
  selected?: boolean;
};

export const NotificationItem = ({
  title,
  time,
  id,
  selected,
}: NotificationItemProps) => {
  return (
    <div
      className={cn(
        'p-2 border group hover:bg-gray-100',
        selected ? 'bg-gray-100' : '',
      )}
    >
      <Link
        className="flex gap-2 p-2 rounded-md"
        href={('/app/dashboard/notifications?id=' + id) as any}
      >
        <div className="grid gap-0.5 items-start">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dayjs(time).fromNow()}
          </p>
        </div>
        <Icons.ArrowRightCircle className="hidden group-hover:block h-4 w-4 ml-auto opacity-50" />
      </Link>
    </div>
  );
};

type NotificationRenderProps = {
  type: string;
  payload: any;
};
export const NotificationRender = ({
  type,
  payload,
}: NotificationRenderProps) => {
  switch (type) {
    case 'EMPLOYEE_MENTIONED_ON_DOCUMENT': {
      return (
        <div className="flex flex-col gap-4">
          <p>{payload.mentionerEmployeeName} mentioned you in a document</p>
          <Button asChild>
            <Link
              href={`/app/dashboard/documents?id=${payload.documentId}` as any}
            >
              View Document
            </Link>
          </Button>
        </div>
      );
    }
    case 'PTO_REQUEST_SUBMITTED': {
      return (
        <div className="flex flex-col gap-4 items-start">
          <p>
            {payload.requestSubmitterName} submitted a PTO request for{' '}
            {payload.requestDuration} from {payload.startDate} to{' '}
            {payload.endDate}
          </p>
          <PtoRequestDetailsDialog
            onOpenChange={console.log}
            trigger={<Button>View Request</Button>}
            requestId={payload.requestId}
            defaultOpen={false}
          />
        </div>
      );
    }
    default: {
      return null;
    }
  }
};
