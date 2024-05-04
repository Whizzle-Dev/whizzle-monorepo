'use client';
import { withAuth } from '@/domain/auth/withAuth';
import * as React from 'react';
import { PreviousCheckIns } from '@/domain/check-in/PreviousCheckIns';

function CheckIn() {
  return <PreviousCheckIns />;
}

export default withAuth(CheckIn);
