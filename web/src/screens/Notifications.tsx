import React, { useCallback, useState } from 'react';

import { useNotification } from '../hooks/NotificationContext';

import NotificationCard from '../components/NotificationCard';

import {
  NotificationsPage,
  Content,
  Header,
  Main,
} from '../styles/screens/notifications';

export default function Notifications() {
  const { notifications } = useNotification();
  const count = notifications.length;

  return (
    <NotificationsPage>
      <Content>
        <Header>
          <h1>Notificações</h1>
          <span>{ count } notificações</span>
        </Header>
        <Main>
          {
            notifications.map((notification) => {
              return (
                <NotificationCard
                  key={notification._id}
                  id={notification._id}
                  createAt={notification.createdAt}
                  title={notification.title}
                  content={notification.content}
                  read={notification.read}
                />
              )
            })
          }
        </Main>
      </Content>
    </NotificationsPage>
  );
}