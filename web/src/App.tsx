import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes/app.routes';

import AppProvider from './hooks';
import GlobalStyle from "./styles/GlobalStyle";
// Essa e a estilização que ja vem com o Leaflet.
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      
      <AppProvider>
        <AppRoutes /> 
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
