'use client';

import React, { Suspense } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import { useGetVacationPolicyQuery } from '@/generated';
import { ManageVacationPolicy } from '@/domain/pto/ManageVacationPolicy';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

const PolicyPage = () => {
  const [id] = useQueryState('id', parseAsInteger);
  const router = useRouter();
  const { data } = useGetVacationPolicyQuery({
    variables: {
      id: id as number,
    },
    skip: !id,
  });

  return (
    <ManageVacationPolicy
      key={id}
      onFinish={() => {
        router.push('/app/dashboard/pto/settings/vacation-policies');
      }}
      policy={data?.vacationPolicy}
      mode="edit"
    />
  );
};

const SuspsensePolicyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PolicyPage />
    </Suspense>
  );
};

export default withAuth(SuspsensePolicyPage);
