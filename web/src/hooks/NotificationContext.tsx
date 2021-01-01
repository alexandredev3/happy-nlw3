import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback
} from 'react';

import api from '../services/api';

interface INotification {
  _id: string;
  title: string;
  content: string;
  read: boolean;
}

interface INotificationContext {
  notifications: INotification[];
  count: string | number | null;
  handleDeleteNotification(_id: string): Promise<void>;
  handleMarkNotificationAsRead(_id: string): Promise<void>;
}

const NotificationContext = createContext<INotificationContext>({} as INotificationContext);

export const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [count, setCount] = useState<string | number | null>("0");

  // perhaps the data is not put into state with socket io.
  // if it doesn't work, try another approach...
  useEffect(() => {
    api.get('/notifications')
      .then((response) => {
        const { data } = response;

        return setNotifications(data);
      })
      .catch(() => {
        return alert("Ocorreu um erro no carregamento das notificações, tente novamente mais tarde.");
      })
  }, []);

  useEffect(() => {
    const unreadNotifications = notifications.filter((notification) => {
      return notification.read === false
    });

    const count = unreadNotifications.length;

    if (count > 9) {
      return setCount("9+");
    }

    if (count === 0) {
      return setCount(null)
    }

    setCount(count);
  }, [notifications]);

  // avoid many requests to the server
  async function handleUpdateNotification(id: string) {
    await api.put(`/notifications/${id}`);
  }

  const handleDeleteNotification = useCallback(async (id: string) => {
    try {
      const notificationIndex = notifications
        .findIndex((notification) => notification._id === id);

      if (notificationIndex >= 0) {
        const notificationsFiltered = notifications
          .filter((_, index) => notificationIndex !== index);

        setNotifications(notificationsFiltered);
      }

      const count = notifications.length;

      setCount(count);

      await api.delete(`/notifications/${id}`);
    } catch(err) {
      return alert("Não foi possível deletar a notificação.");
    }
  }, [notifications]);

  const handleMarkNotificationAsRead = useCallback(async (id: string) => {
    try {
      const readNotifications = await notifications.map((notification) => {
        if (notification._id === id && !notification.read) {
          handleUpdateNotification(id);

          notification.read = true;
        }

        return notification;
      });
      
      setNotifications(readNotifications);
    } catch(err) {
      console.log('handleReadNotification Function:', err);
    }
  }, [notifications])

  return (
  <NotificationContext.Provider
    value={{ 
      notifications,
      count,
      handleDeleteNotification,
      handleMarkNotificationAsRead 
    }}
  >
    { children }
  </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification context must be used within an NotificationProvider');
  }

  return context;
}