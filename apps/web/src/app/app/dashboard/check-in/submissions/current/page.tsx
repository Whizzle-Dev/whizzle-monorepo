'use client';
import { withAuth } from '@/domain/auth/withAuth';
import * as React from 'react';
import { CurrentCheckInView } from '@/domain/check-in/CurrenctCheckInView';

function CheckIn() {
  return <CurrentCheckInView />;
}

export default withAuth(CheckIn);
