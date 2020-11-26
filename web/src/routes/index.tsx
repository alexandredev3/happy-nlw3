import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard/orphanages" component={Dashboard} />
        <Route path="/dashboard/pending-orphanages" component={PendingOrphanages} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;