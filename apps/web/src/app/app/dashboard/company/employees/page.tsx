'use client';
import { withAuth } from '@/domain/auth/withAuth';
import * as React from 'react';
import { EmployeesView } from '@/domain/employees/EmployeesTable';

function Employees() {
  return <EmployeesView />;
}

export default withAuth(Employees);
