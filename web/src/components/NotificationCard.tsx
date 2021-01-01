import React, { useCallback, useState } from 'react';
import { FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';

import { useNotification } from '../hooks/NotificationContext';

import {
  NotificationContainer,
  NotificationPreview,
  Options,
  OpenNotificationButton,
  DeleteNotificationButton,
  Notification,
} from '../styles/components/notification-card';

interface Props {
  id: string;
  title: string;
  content: string;
  read: boolean;
}

const NotificationCard: React.FC<Props> = ({
  id,
  title,
  content,
  read
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

  return (
    <NotificationContainer>
      {
        isOpenNotification ? (
          <Notification>
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
          <NotificationPreview
            read={read}
          >
            <h3>{ title }</h3>
            <Options>
              <OpenNotificationButton onClick={handleToggleNotification}>
                <FiArrowDown color="#15C3D6" size={22} />
              </OpenNotificationButton>
              <DeleteNotificationIcon />
            </Options>
          </NotificationPreview>
        )
      }
    </NotificationContainer>
  );
}

export default NotificationCard;