import React, { useCallback, useRef } from 'react';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';

import ModalDeleteOrphanage, { IModalHandles } from '../components/ModalDeleteOrphanage';

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
  title: string;
  latitude: string;
  longitude: string;
}

const OrphanagesCard: React.FC<OrphanagesCardProps> = ({
  isPendingOrphanages,
  title,
  latitude,
  longitude 
}) => {
  const modalRef = useRef<IModalHandles>(null);

  const handleDeleteOrphanage = useCallback(() => {
    modalRef.current?.handleOpenModal();
  }, [modalRef])

  return (
    <Container>
      <ModalDeleteOrphanage
        ref={modalRef}
      />

      <MapContent>
        <Map 
          center={[Number(latitude), Number(longitude)]}
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
            position={[Number(latitude), Number(longitude)]} 
          />
        </Map>
      </MapContent>

      <Description>
        <h2>{ title }</h2>
        <Options>
          { isPendingOrphanages ? (
            <EditButton>
              <Link to="pending-orphanages/details">
                <FiArrowRight color="#15C3D6" size={22} />
              </Link>
            </EditButton>
          ) : (
            <>
              <EditButton>
                <Link to="orphanages/update">
                  <FiEdit3 color="#15C3D6" size={22} />
                </Link>
              </EditButton>
              <DeleteButton onClick={handleDeleteOrphanage}>
                <FiTrash color="#15C3D6" size={22} />
              </DeleteButton>
            </>
          ) }
        </Options>
      </Description>
    </Container>
  );
}

export default OrphanagesCard;