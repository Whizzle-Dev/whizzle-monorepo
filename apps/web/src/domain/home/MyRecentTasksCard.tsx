import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetRecentTasksForEmployeeQuery } from '@/generated';
import { Loader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const MyRecentTasks = () => {
  const { data, loading } = useGetRecentTasksForEmployeeQuery();
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>My Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Loader />}
        {(data?.myRecentTasks.length ?? 0) > 0 && (
          <ul>
            {data?.myRecentTasks.map((task) => (
              <li key={task.id} className="">
                <div className="grid grid-cols-3 gap-2 items-center mb-2">
                  <Link
                    href={
                      ('/app/dashboard/project-management/tasks?id=' +
                        task.id) as any
                    }
                  >
                    <span className="font-medium hover:underline">
                      {task.name}
                    </span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href={
                        ('/app/dashboard/project-management/projects?id=' +
                          task.project?.id) as any
                      }
                    >
                      <span className="hover:underline">
                        {task.project?.name}{' '}
                      </span>
                    </Link>
                    <div
                      className="h-4 w-4 rounded-full flex-shrink-0"
                      style={{ background: task.project?.color }}
                    />
                  </div>
                  <Badge className="w-fit h-fit" variant="secondary">
                    {task.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!data?.myRecentTasks.length && !loading && (
          <CardDescription>No recent tasks.</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
