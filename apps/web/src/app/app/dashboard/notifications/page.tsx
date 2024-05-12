'use client';

import React, { Suspense, useEffect } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import {
  NotificationFragment,
  UnreadNotificationsCountDocument,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/generated';
import { dayjs } from '@/lib/date';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
  NotificationItem,
  NotificationRender,
} from '@/domain/notifications/NotificationRender';
import { Loader } from '@/components/ui/loader';

const NotificationsPage = () => {
  const { data, loading } = useGetNotificationsQuery();

  const [markAsRead] = useMarkNotificationAsReadMutation({
    refetchQueries: [UnreadNotificationsCountDocument],
  });
  const [notificationId, setNotificationId] = useQueryState<number>(
    'id',
    parseAsInteger,
  );

  useEffect(() => {
    if (
      !notificationId &&
      data?.notifications.length &&
      data.notifications?.[0]?.id
    ) {
      setNotificationId(data.notifications[0].id);
    }
  }, [data, notificationId]);

  const renderNotificationDetails = (notification: NotificationFragment) => {
    return (
      <div className="flex-1 flex flex-col">
        <header className="p-4">
          <h2 className="text-lg font-medium">{notification.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dayjs(notification.createdAt).fromNow()}
          </p>
        </header>
        <div className="flex-1 p-4 grid gap-4">
          <NotificationRender
            type={notification.eventName}
            payload={notification.payload}
          />
        </div>
      </div>
    );
  };

  const selected = data?.notifications.find(
    (notification) => notification.id === notificationId,
  );

  useEffect(() => {
    if (selected && !selected.read) {
      markAsRead({ variables: { id: selected.id } });
    }
  }, [notificationId]);

  const hasNotifications = !!data?.notifications.length;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="flex w-full max-w-screen-lg">
        <nav className="flex flex-col w-[300px] flex-shrink-0 overflow-auto">
          {loading && <Loader />}
          {data?.notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              time={notification.createdAt}
              id={notification.id}
              selected={notification.id === notificationId}
            />
          ))}
          {!loading && !hasNotifications && (
            <p className="text-gray-500 dark:text-gray-400">
              You are up to date! No new notifications.
            </p>
          )}
        </nav>
        {!loading && hasNotifications && (
          <div className="flex">
            {selected ? (
              renderNotificationDetails(selected)
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a notification to view details
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SuspensedPage = () => {
  return (
    <Suspense>
      <NotificationsPage />
    </Suspense>
  );
};

export default withAuth(SuspensedPage);
