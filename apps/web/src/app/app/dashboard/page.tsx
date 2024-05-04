'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withAuth } from '@/domain/auth/withAuth';
import { WhoIsAbsentCard } from '@/domain/home/WhoIsAbsentCard';
import { WelcomeNewJoinersCard } from '@/domain/home/WelcomeNewJoinersCard';
import { RecentlyUpdatedDocuments } from '@/domain/home/RecentlyUpdatedDocuments';
import { MyRecentTasks } from '@/domain/home/MyRecentTasksCard';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  useGetCheckInsStatsForEmployeeQuery,
  useGetCurrentUserQuery,
} from '@/generated';
import { Loader } from '@/components/ui/loader';
import Link from 'next/link';

const DueCheckInCard = () => {
  const { data, loading } = useGetCheckInsStatsForEmployeeQuery();
  const overdue = data?.checkInsStatsForEmployee.overdue ?? 0;
  const completionRate = data?.checkInsStatsForEmployee.completionRate ?? 0;
  const pending = data?.checkInsStatsForEmployee.pending ?? 0;
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Check-in Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Loader />}
        <>
          <div className="grid gap-4 grid-cols-3 grid-rows-1">
            <div className="flex items-center gap-4">
              {!loading && pending === 0 ? (
                <>
                  <span className="text-green-700 font-medium">
                    All caught up for today!
                  </span>
                </>
              ) : (
                <>
                  <span className="text-orange-400 font-medium">
                    Pending: <span className="font-bold">{pending}</span>
                  </span>
                  <Button variant="secondary" asChild>
                    <Link href="/app/dashboard/check-in/submissions/current">
                      View
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              {!loading && overdue > 0 && (
                <>
                  <span className="text-orange-800 font-medium">
                    Past Due: <span className="font-bold">{overdue}</span>
                  </span>
                  <Button variant="secondary" asChild>
                    <Link href="/app/dashboard/check-in/submissions/previous">
                      View
                    </Link>
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Completion Rate: {completionRate}%
              </span>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

function DashboardPage() {
  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });
  return (
    <>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, {data?.currentUser.name}
          </h2>
          <Button variant="ghost" className="gap-2">
            Customize Widgets
            <Icons.Cog size={18} />
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <WhoIsAbsentCard />
          <WelcomeNewJoinersCard />
        </div>
        <DueCheckInCard />
        <MyRecentTasks />
        <RecentlyUpdatedDocuments />
      </div>
    </>
  );
}

export default withAuth(DashboardPage);
