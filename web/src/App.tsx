import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';

import AppContextPublic from './hooks/PublicProvider';

import GlobalStyle from "./styles/GlobalStyle";
// Essa e a estilização que ja vem com o Leaflet.
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      
      <AppContextPublic>
        <AppRoutes />
      </AppContextPublic>
    </BrowserRouter>
  );
}

export default App;
