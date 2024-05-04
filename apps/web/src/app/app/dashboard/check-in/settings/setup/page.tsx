'use client';

import { AvailableCheckInsForSetup } from '@/domain/check-in/manage/AvailableCheckInsForSetup';
import { withAuth } from '@/domain/auth/withAuth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const SetupCheckIns = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          <Icons.ArrowLeft />
        </Button>
        <h2 className="text-2xl font-bold">Check-ins Setup</h2>
      </div>
      <Separator className="my-6" />
      <AvailableCheckInsForSetup />
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback="Loading...">
      <SetupCheckIns />
    </Suspense>
  );
};

export default withAuth(Page);
