import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/**
 * O SWITCH e opcional.
 * Com o Switch por volta das rotas, ele vai apenas chamar uma rota por vez.
 */

import Landing from '../screens/Landing';
import OrphanagesMap from '../screens/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;