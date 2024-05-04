'use client';
import { withAuth } from '@/domain/auth/withAuth';
import * as React from 'react';
import { RolesView } from '@/domain/employees/roles/RolesViewConfig';

function Roles() {
  return <RolesView />;
}

export default withAuth(Roles);
