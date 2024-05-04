'use client';
import { withAuth } from '@/domain/auth/withAuth';

import * as React from 'react';

import { CalendarTw } from '@/app/app/dashboard/pto/absence-calendar/components';
import { Suspense } from 'react';

const AbsenceCalendar = () => {
  return (
    <Suspense>
      <CalendarTw />
    </Suspense>
  );
};

export default withAuth(AbsenceCalendar);
