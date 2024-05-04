'use client';
import { withAuth } from '@/domain/auth/withAuth';
import * as React from 'react';
import { TeamsView } from '@/domain/employees/teams/TeamsTable';

function Teams() {
  return <TeamsView />;
}

export default withAuth(Teams);
