import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './Private.routes';
import PublicRoute from './Public.routes';
import RestrictedRoute from './Restricted.routes';

import AppContextPrivate from '../hooks/PrivateProvider';

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
    <PublicRoute path="/" exact component={Landing} />
    <PublicRoute path="/signin" exact component={Signin} />
    <PublicRoute path="/signup" component={SignUp} />
    <PublicRoute path="/signin/password/forgot" component={ForgotPassword} />
    <PublicRoute path="/password/reset" component={ResetPassword} />
    <AppContextPrivate>
      <PrivateRoute path="/app" component={OrphanagesMap} />
      <PrivateRoute path="/notifications" component={Notifications} />
      <PrivateRoute path="/orphanages/create" component={CreateOrphanage} />
      <PrivateRoute path="/orphanages/:id" component={Orphanage} />
      <RestrictedRoute path="/dashboard/orphanages" exact component={Dashboard} />
      <RestrictedRoute path="/dashboard/pending-orphanages" exact component={PendingOrphanages} />
      <RestrictedRoute path="/dashboard/pending-orphanages/details" component={PendingOrphanagesDetails} />
      <RestrictedRoute path="/dashboard/orphanages/update/:orphanage_id" component={EditOrphanages} />
    </AppContextPrivate>
  </Switch>
);

export default AppRoutes;