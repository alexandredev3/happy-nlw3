import React from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiArrowLeft, FiPlus } from "react-icons/fi";

import mapMarkerImg from '../assets/images/map-marker.svg';

import { 
  PageCreateOrphanage,
  Aside,
  Footer,
  Main,
  Form,
  Fieldset,
  Legend,
  InputBlock,
  Label,
  UploadedImage,
  NewImageButton,
  ButtonSelect,
  Button,
  ConfirmButton 
} from '../styles/screens/create-orphanage';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const { goBack } = useHistory();

  return (
    <PageCreateOrphanage>
      <Aside>
        <img src={mapMarkerImg} alt="Happy" />

        <Footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </Footer>
      </Aside>

      <Main>
        <Form>
          <Fieldset>
            <Legend>Dados</Legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
            </Map>

            <InputBlock>
              <Label htmlFor="name">Nome</Label>
              <input id="name" />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></Label>
              <textarea id="name" maxLength={300} />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="images">Fotos</Label>

              <UploadedImage>

              </UploadedImage>

              <NewImageButton>
                <FiPlus size={24} color="#15b6d6" />
              </NewImageButton>
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <Legend>Visitação</Legend>

            <InputBlock>
              <Label htmlFor="instructions">Instruções</Label>
              <textarea id="instructions" />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="opening_hours">Nome</Label>
              <input id="opening_hours" />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="open_on_weekends">Atende fim de semana</Label>

              <ButtonSelect>
                <Button type="button" active>Sim</Button>
                <Button type="button">Não</Button>
              </ButtonSelect>
            </InputBlock>
          </Fieldset>

          <ConfirmButton type="submit">
            Confirmar
          </ConfirmButton>
        </Form>
      </Main>
    </PageCreateOrphanage>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
