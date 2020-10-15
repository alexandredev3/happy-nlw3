import React from 'react';

import Routes from './routes';

import GlobalStyle from "./styles/GlobalStyle";
// Essa e a estilização que ja vem com o Leaflet.
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
