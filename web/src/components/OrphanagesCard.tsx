import React from 'react';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { 
  Container,
  MapContent, 
  Description, 
  Options,
  EditButton,
  DeleteButton,
} from '../styles/components/orphanages-card';

import mapIcon from '../utils/mapIcon';

interface OrphanagesCardProps {
  isPendingOrphanages?: boolean;
  // title: string;
  // latitude: number;
  // longitude: number;
}

const OrphanagesCard: React.FC<OrphanagesCardProps> = ({ isPendingOrphanages }) => {
  return (
    <Container>
      <MapContent>
        <Map 
          center={[-16.2476171, -47.9475306]}
          style={{ width: '100%', height: 200 }}
          zoom={15}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer 
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <Marker 
            interactive={false} 
            icon={mapIcon} 
            position={[-16.2476171, -47.9475306]} 
          />
        </Map>
      </MapContent>

      <Description>
        <h2>Orf. Esperança</h2>
        <Options>
          { isPendingOrphanages ? (
            <EditButton>
              <Link to="#">
                <FiArrowRight color="#15C3D6" size={20} />
              </Link>
            </EditButton>
          ) : (
            <>
              <EditButton>
                <Link to="#">
                  <FiEdit3 color="#15C3D6" size={20} />
                </Link>
              </EditButton>
              <DeleteButton>
                <Link to="#">
                  <FiTrash color="#15C3D6" size={20} />
                </Link>
              </DeleteButton>
            </>
          ) }
        </Options>
      </Description>
    </Container>
  );
}

export default OrphanagesCard;