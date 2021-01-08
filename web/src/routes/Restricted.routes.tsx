import React, { useEffect } from 'react';
import { 
  Route as RouteDom,
  RouteProps as RouteDomProps,
  Redirect,
  useLocation
} from 'react-router-dom';

import { useDashboard } from '../hooks/DashboardContext';

interface RouteProps extends RouteDomProps {
  component: React.ComponentType;
}

const RouteRestricted: React.FC<RouteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isAdmin } = useDashboard();
  const location = useLocation();

  const path = location.pathname === '/dashboard/orphanages'; 

  if (!isAdmin) {
    return (
      <>
        {
          path && (
            <Redirect
              to={{
                pathname: path ? '/app' : undefined,
                state: { from: location }
              }}
            />
          )
        }
      </>
    );
  }

  return (
    <RouteDom 
      { ...rest }
      render={() => {
        if (isAdmin) {
          return <Component />
        }
      }}
    />
  );
}

export default RouteRestricted;