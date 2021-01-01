import React from 'react';
import { Switch, Route as RouteDom } from 'react-router-dom';
import Route from './Route';
/**
 * O SWITCH e opcional.
 * Com o Switch por volta das rotas, ele vai apenas chamar uma rota por vez.
 */

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
    <Route path="/" exact component={Landing} />
    <Route path="/signin" exact component={Signin} />
    <Route path="/signup" component={SignUp} />
    <Route path="/app" component={OrphanagesMap} isPrivate />
    <Route path="/notifications" component={Notifications} isPrivate />
    <Route path="/signin/password/forgot" component={ForgotPassword} />
    <Route path="/password/reset" component={ResetPassword} />
    <Route path="/orphanages/create" component={CreateOrphanage} isPrivate />
    <Route path="/orphanages/:id" component={Orphanage} isPrivate />
    <Route path="/dashboard/orphanages" exact component={Dashboard} />
    <Route path="/dashboard/pending-orphanages" exact component={PendingOrphanages} />
    <Route path="/dashboard/pending-orphanages/details" component={PendingOrphanagesDetails} />
    <Route path="/dashboard/orphanages/update" component={EditOrphanages} />
  </Switch>
)

export default AppRoutes;