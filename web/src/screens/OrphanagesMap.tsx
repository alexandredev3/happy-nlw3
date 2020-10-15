import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import markerMapImg from '../assets/images/map-marker.svg';

import mapIcon from '../utils/mapIcon';

import api from '../services/api';

import { 
  PageMap,
  Aside,
  Header,
  Footer,
  CreateOrphanagesButton,
} from '../styles/screens/orphanages-map-styles';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

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

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup 
                closeButton={false}
                minWidth={240}
                maxHeight={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <CreateOrphanagesButton>
        <Link to="/orphanages/create">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </CreateOrphanagesButton>
    </PageMap>
  );
}

export default OrphanagesMap;
