import React, { useCallback, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import { 
  PageOrphanage,
  Main,
  OrphanageDetails,
  Images,
  ImageButton,
  OrphanageDetailsContent,
  MapContainer,
  MapContentFooter,
  OpenDetails,
  Hour,
  OpenOnWeekends,
  DontOpenOnWeekends,
  ContactButton,
} from '../styles/screens/orphanage'

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  whatsapp: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [params.id]);
  // toda vez que usamos uma variavel dentro de um useEffect, provalvemente vamos ter que colocar dentro da Array.

  const handleChangeImage = useCallback((index) => {
    setActiveImageIndex(index);
  }, [activeImageIndex]);

  if (!orphanage) {
    return <h2>Carregando...</h2>
  }

  return (
    <PageOrphanage>
      <Sidebar />

      <Main>
        <OrphanageDetails>
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <Images>
            {orphanage.images.map((image, index) => {
              return (
                <ImageButton 
                  key={image.id}
                  onClick={() => handleChangeImage(index)}
                  active={activeImageIndex === index ? true : false}
                >
                  <img src={image.url} alt={orphanage.name} />
                </ImageButton>
              )
            })}
          </Images>
          
          <OrphanageDetailsContent>
            <h1>{orphanage.name}</h1>
            <p>
              {orphanage.about}
            </p>

            <MapContainer>
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <MapContentFooter>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </MapContentFooter>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>
              {orphanage.instructions}
            </p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </Hour>
              { 
                orphanage.open_on_weekends ? (
                  <OpenOnWeekends>
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </OpenOnWeekends>
                ) : (
                  <DontOpenOnWeekends>
                    <FiInfo size={32} color="#FF6690" />
                    Não atendemos <br />
                    fim de semana
                  </DontOpenOnWeekends>
                ) 
              }
            </OpenDetails>

            <ContactButton 
              target="_blank" 
              rel="noopener noreferrer" 
              href={`https://wa.me/${orphanage.whatsapp}`}
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </OrphanageDetailsContent>
        </OrphanageDetails>
      </Main>
    </PageOrphanage>
  );
}