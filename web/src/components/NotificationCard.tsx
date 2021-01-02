import React, { useCallback, useState } from 'react';
import { FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useNotification } from '../hooks/NotificationContext';

import {
  NotificationContainer,
  NotificationPreview,
  Options,
  OpenNotificationButton,
  DeleteNotificationButton,
  Notification,
  Wrapper,
  Dot
} from '../styles/components/notification-card';
import { createFalse } from 'typescript';

interface Props {
  id: string;
  title: string;
  content: string;
  read: boolean;
  createAt: Date;
}

const NotificationCard: React.FC<Props> = ({
  id,
  title,
  content,
  read,
  createAt
}) => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const { handleMarkNotificationAsRead, handleDeleteNotification } = useNotification();

  const handleToggleNotification = useCallback(() => {
    setIsOpenNotification(!isOpenNotification);
    handleMarkNotificationAsRead(id)
  }, [isOpenNotification]);

  const DeleteNotificationIcon = () => (
    <DeleteNotificationButton onClick={() => handleDeleteNotification(id)}>
      <FiTrash color="#15C3D6" size={22} />
    </DeleteNotificationButton>
  )

  const notificationDate = new Date(createAt);

  const dateFormated = format(notificationDate, "dd' de 'MMM', ' yyyy' ás 'HH:mm", {
    locale: ptBR
  });

  return (
    <NotificationContainer>
      {
        isOpenNotification ? (
          <Notification>
            <span>{ dateFormated }</span>
            <h3>{ title }</h3>
            <p>
              { content }
            </p>
            <Options>
              <OpenNotificationButton onClick={handleToggleNotification}>
                <FiArrowUp color="#15C3D6" size={22} />
              </OpenNotificationButton>
              <DeleteNotificationIcon />
            </Options>
          </Notification>
        ) : (
          <>
            {
              read ? <Dot active={false} /> : <Dot active={true} />
            }
            <NotificationPreview
              read={read}
            >
              <span>{ dateFormated }</span>
              <Wrapper>
                <h3>{ title }</h3>
                <Options>
                  <OpenNotificationButton onClick={handleToggleNotification}>
                    <FiArrowDown color="#15C3D6" size={22} />
                  </OpenNotificationButton>
                  <DeleteNotificationIcon />
                </Options>
              </Wrapper>
            </NotificationPreview>
          </>
        )
      }
    </NotificationContainer>
  );
}

export default NotificationCard;