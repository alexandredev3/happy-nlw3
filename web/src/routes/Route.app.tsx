import React from 'react';
import { 
  Route as RouteDom,
  RouteProps as RouteDomProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RouteDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const RouteApp: React.FC<RouteProps> = ({ 
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  return (
    <RouteDom 
      { ...rest }
      render={({ location }) => {
        if (isPrivate === signed) {
          return <Component />
        } else {
          return (
            <Redirect to={{
              pathname: isPrivate ? '/signin' : '/app',
              state: { from: location }
            }} />
          )
        }
      }}
    />
  )
}

export default RouteApp;
