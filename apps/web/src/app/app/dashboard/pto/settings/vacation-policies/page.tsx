'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { VacationPoliciesView } from '@/domain/pto/VacationPoliciesView';
import { Suspense } from 'react';

function VacationPolicies() {
  return (
    <Suspense>
      <VacationPoliciesView />
    </Suspense>
  );
}

export default withAuth(VacationPolicies);
