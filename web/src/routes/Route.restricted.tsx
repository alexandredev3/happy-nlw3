import React from 'react';
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
  const { error, pendingOrphanages } = useDashboard();
  const location = useLocation();

  if (error) {
    return (
      <Redirect 
        to={{
          pathname: error ? '/app' : '/dashboard/orphanages',
          state: { from: location }
        }}
      />
    );
  }

  return (
    <RouteDom 
      { ...rest }
      render={() => {
        if (!!pendingOrphanages) {
          return <Component />
        }
      }}
    />
  );
}

export default RouteRestricted;