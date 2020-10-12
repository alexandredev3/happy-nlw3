import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import markerMapImg from '../assets/images/map-marker.svg';

// Essa e a estilização que ja vem com o Leaflet.
import 'leaflet/dist/leaflet.css';

import { 
  PageMap,
  Aside,
  Header,
  Footer,
  CreateOrphanagesButton,
} from '../styles/screens/orphanages-map-styles';

const OrphanagesMap: React.FC = () => {
  return (
    <PageMap>
      <Aside>
        <Header>
          <img src={markerMapImg} alt="happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </Header>

        <Footer>
          <strong>Luziânia</strong>
          <span>Goiás</span>
        </Footer>
      </Aside>

      <Map 
        center={[-16.221166, -47.934621]}
        zoom={15}
        style={{
          width: '100%', height: '100%'
        }}
      >
        {/* servidor onde fica as imagens do mapa */}
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />
      </Map>

      <CreateOrphanagesButton>
        <Link to="#">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </CreateOrphanagesButton>
    </PageMap>
  );
}

export default OrphanagesMap;
