import React from 'react';

import { DashboardProvider } from './DashboardContext';
import { NotificationProvider } from './NotificationContext';

const PrivateProvider: React.FC = ({ children }) => {
  return (
    <DashboardProvider>
      <NotificationProvider>
        { children }
      </NotificationProvider>
    </DashboardProvider>
  )
}

export default PrivateProvider;