import React from 'react';

import { AuthProvider } from './AuthContext';

const PublicProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default PublicProvider;