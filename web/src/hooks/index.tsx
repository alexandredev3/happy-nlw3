import React from 'react';

import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NotificationProvider>
  )
}

export default AppProvider;