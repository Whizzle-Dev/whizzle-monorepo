'use client';

import { withAuth } from '@/domain/auth/withAuth';
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetProjectsQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClickOutIcon, Icons } from '@/components/ui/icons';
import { CreateProjectDrawer } from '@/domain/time-tracking/CreateProjectDrawer';
import { Loader } from '@/components/ui/loader';
import { MyTasksSection } from '@/app/app/dashboard/project-management/MyTasksSection';

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
        {projectsQuery.loading && <Loader />}
        {!projectsQuery.loading && !projectsQuery.data?.projects.length && (
          <p className="text-gray-500">No projects created yet.</p>
        )}
        {!projectsQuery.loading &&
          projectsQuery.data?.projects.map((project) => (
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
                      href={{
                        pathname: '/app/dashboard/project-management/projects',
                        query: {
                          id: project.id.toString(),
                        },
                      }}
                    >
                      <ClickOutIcon />
                    </Link>
                  </Button>
                </div>
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

export default withAuth(ProjectManagement);
