'use client';

import { withAuth } from '@/domain/auth/withAuth';
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMyTasksQuery, useGetProjectsQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClickOutIcon, Icons } from '@/components/ui/icons';
import { CreateProjectDrawer } from '@/domain/time-tracking/CreateProjectDrawer';
import { useMyTasksColumns } from '@/app/app/dashboard/project-management/useMyTasksColumns';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';

const ProjectManagement = () => {
  const projectsQuery = useGetProjectsQuery();
  const [createOpen, setCreateOpen] = React.useState(false);
  return (
    <Suspense>
      <div className="flex flex-row items-center justify-between mb-2">
        <h3 className="text-lg font-bold mb-4">My Projects</h3>
        <div className="flex items-center gap-2">
          <Button variant="secondary">View All</Button>
          <Button
            className="flex flex-row gap-2"
            onClick={() => setCreateOpen(true)}
          >
            Create Project
            <Icons.PlusIcon size={18} />
          </Button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {projectsQuery.data?.projects.map((project) => (
          <Card className="w-[250px] relative" key={project.id}>
            <CardHeader className="flex flex-row items-center max-w-[80%]">
              <CardTitle className="font-medium">{project.name} </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=" flex items-center absolute right-2 top-4 gap-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ background: project.color }}
                />
                <Button size="icon" variant="ghost" asChild>
                  <Link
                    href={
                      ('/app/dashboard/project-management/projects?id=' +
                        project.id) as any
                    }
                  >
                    <ClickOutIcon />
                  </Link>
                </Button>
              </div>
              {/*// make two by two grid*/}
              {/*<Separator className="my-1" />*/}
              {/*<div className="grid grid-cols-2">*/}
              {/*  <span className="font-medium">49</span>*/}
              {/*  <span className="font-medium"></span>*/}
              {/*  <span className="text-gray-500">Tasks</span>*/}
              {/*  <span className="text-gray-500"></span>*/}
              {/*</div>*/}
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator className="my-6" />
      <h3 className="text-lg font-bold mb-4">My Tasks</h3>
      <MyTasksSection />
      <CreateProjectDrawer open={createOpen} onOpenChange={setCreateOpen} />
    </Suspense>
  );
};

// show the same table but with tasks from all projects and add project column
const MyTasksSection = () => {
  const { data, refetch, loading } = useGetMyTasksQuery();

  const columns = useMyTasksColumns({
    onUpdate: () => {
      refetch();
    },
  });

  const { table } = useDataTable({
    data: data?.myTasks,
    columns,
  });
  return <DataTable colSpan={columns.length} table={table} loading={loading} />;
};

export default withAuth(ProjectManagement);
