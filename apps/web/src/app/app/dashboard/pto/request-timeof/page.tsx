'use client';
import { withAuth } from '@/domain/auth/withAuth';

import SettingsLayout from '@/components/layout/SettingsLayout';
import { useGetVacationPoliciesQuery } from '@/generated';
import { FeatureNotSetup } from '@/components/FeatureNotSetup';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
import * as React from 'react';
import { MyPtoPage } from '@/app/app/dashboard/pto/request-timeof/myPtoPage';

const RequestTimeOf = () => {
  const router = useRouter();

  const { data, loading } = useGetVacationPoliciesQuery();
  const isSetup = !!data?.vacationPolicies.length && !loading;
  // get all approvals - display status, description, cta for approving/rejecting
  return (
    <>
      <SettingsLayout
        sidebarNavItems={[]}
        title="Paid Time Leave"
        description="View and manage paid time off for you and your team."
        withSidebar={false}
      >
        <div>
          {loading && <Loader />}
          {isSetup ? (
            <MyPtoPage />
          ) : (
            !loading && (
              <FeatureNotSetup
                action="Setup Paid Time Leave"
                description={
                  "Looks like you haven't configured paid time off for your organization. Setup paid time off to enable employees to use them. If you are an employee contact your account administrator."
                }
                onAction={() =>
                  router.push('/app/dashboard/pto/settings/vacation-policies')
                }
              />
            )
          )}
        </div>
      </SettingsLayout>
    </>
  );
};

export default withAuth(RequestTimeOf);
