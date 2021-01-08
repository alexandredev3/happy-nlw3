import React from 'react';
import { 
  Route as RouteDom,
  RouteProps as RouteDomProps,
  Redirect,
  useLocation
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RouteDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const PublicRoute: React.FC<RouteProps> = ({ 
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();
  const location = useLocation();

  return (
    <RouteDom 
      { ...rest }
      render={({ location }) => {
        if (!signed) {
          return <Component />
        } else {
          return (
            <Redirect to={{
              pathname: '/app',
              state: { from: location }
            }} />
          )
        }
      }}
    />
  )
}

export default PublicRoute;
