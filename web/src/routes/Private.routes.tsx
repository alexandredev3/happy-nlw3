import React from 'react';
import { 
  Route as RouteDom,
  RouteProps as RouteDomProps,
  Redirect,
  useLocation
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RouteDomProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({ 
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();
  const location = useLocation();

  return (
    <RouteDom 
      { ...rest }
      render={({ location }) => {
        if (signed) {
          return <Component />
        } else {
          return (
            <Redirect to={{
              pathname: '/signin',
              state: { from: location }
            }} />
          )
        }
      }}
    />
  )
}

export default PrivateRoute;
