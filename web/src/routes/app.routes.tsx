import React from 'react';
import { Switch, Route as RouteDom } from 'react-router-dom';
import RouteApp from './Route.app';
import RouteRestricted from './Route.restricted';

import { DashboardContext } from '../hooks/DashboardContext';

import Landing from '../screens/Landing';
import OrphanagesMap from '../screens/OrphanagesMap';
import CreateOrphanage from '../screens/CreateOrphanage';
import Orphanage from '../screens/Orphanage';
import Signin from '../screens/Signin';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import PendingOrphanages from '../screens/PendingOrphanages';
import PendingOrphanagesDetails from '../screens/PendingOrphanagesDetails';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import EditOrphanages from '../screens/EditOrphanages';
import Notifications from '../screens/Notifications';

const AppRoutes: React.FC = () => (
  <Switch>
    <RouteApp path="/" exact component={Landing} />
    <RouteApp path="/signin" exact component={Signin} />
    <RouteApp path="/signup" component={SignUp} />
    <RouteApp path="/app" component={OrphanagesMap} isPrivate />
    <RouteApp path="/notifications" component={Notifications} isPrivate />
    <RouteApp path="/signin/password/forgot" component={ForgotPassword} />
    <RouteApp path="/password/reset" component={ResetPassword} />
    <RouteApp path="/orphanages/create" component={CreateOrphanage} isPrivate />
    <RouteApp path="/orphanages/:id" component={Orphanage} isPrivate />
    <DashboardContext>
      <RouteRestricted path="/dashboard/orphanages" exact component={Dashboard} />
      <RouteRestricted path="/dashboard/pending-orphanages" exact component={PendingOrphanages} />
      <RouteRestricted path="/dashboard/pending-orphanages/details" component={PendingOrphanagesDetails} />
      <RouteRestricted path="/dashboard/orphanages/update" component={EditOrphanages} />
    </DashboardContext>
  </Switch>
)

export default AppRoutes;