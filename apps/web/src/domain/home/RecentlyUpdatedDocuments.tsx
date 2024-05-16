'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetRecentlyUpdatedDocumentsQuery } from '@/generated';
import { Loader } from '@/components/ui/loader';
import { EmployeeAvatar } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ClickOutIcon, Icons } from '@/components/ui/icons';

export const RecentlyUpdatedDocuments = () => {
  const { data, loading } = useGetRecentlyUpdatedDocumentsQuery();
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recently Updated Documents <Icons.FileText size={18} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Loader />}
        {!loading && !data?.recentlyUpdatedDocuments?.length && (
          <CardDescription>No recently updated documents</CardDescription>
        )}
        <div className="flex flex-col gap-3">
          {!loading &&
            data?.recentlyUpdatedDocuments?.map(
              (document) =>
                document.employeeName && (
                  <div
                    key={document.id}
                    className="flex flex-row items-center gap-2"
                  >
                    <Link
                      href={{
                        pathname: '/app/dashboard/documents',
                        query: { id: document.id.toString() },
                      }}
                      className="group flex flex-row items-center gap-2"
                    >
                      <p className="font-medium group-hover:underline">
                        {document.name}
                      </p>
                      <div className="invisible group-hover:visible">
                        <ClickOutIcon size={16} />
                      </div>
                    </Link>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">
                        <strong>{document.employeeName}</strong>{' '}
                      </span>
                      <EmployeeAvatar
                        name={document.employeeName}
                        src={document.employeePhotoUrl}
                      />
                      <span className="text-gray-500 text-sm">
                        on {dayjs(document.updatedAt).format('MMMM D, HH:mm A')}
                      </span>
                    </div>
                  </div>
                ),
            )}
        </div>
      </CardContent>
    </Card>
  );
};
