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

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/landing" component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;