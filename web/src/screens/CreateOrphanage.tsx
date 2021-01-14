import React, { useCallback, useState, useRef } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Element, scroller } from 'react-scroll';
import * as Yup from 'yup';

import mapIcon from '../utils/mapIcon';
import { orphanageFormValidation, getValidationErrors } from '../utils/orphanageFormValidation';

import Sidebar from "../components/Sidebar";
import Input from '../components/Input';
import InputFile from '../components/FileInput';
import ConfirmButton from '../components/Button';
import ValidationMapError from '../components/ValidationMapError';
import ModalRegisterOrphanage, { IModalHandles } from "../components/ModalRegisterOrphanage";

import api from "../services/api";

import { 
  PageCreateOrphanage,
  Main,
  Fieldset,
  Legend,
  InputBlock,
  Label,
  ButtonSelect,
  Button
} from '../styles/screens/create-orphanage';

interface ICreateOrphanages {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  whatsapp: string;
  files: string[];
  latitude: number;
  longitude: number;
}

interface IValidationError {
  [key: string]: string;
};

export default function CreateOrphanage() {
  const [positionMarker, setPositionMarker] = useState({ 
    latitude: 0, longitude: 0 
  });
  const [positionMarkerError, setPositionMarkerError] = useState(false);
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  const inputRefs = useRef<FormHandles | any>(null);
  const modalRef = useRef<IModalHandles>(null);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng

    setPositionMarker({
      latitude: lat,
      longitude: lng
    })
  }, [positionMarker]);

  const handleSubmit = useCallback(async (orphanageData: ICreateOrphanages) => {
    const images = Array.from(orphanageData.files);

    const { 
      name,
      about,
      instructions,
      opening_hours,
      whatsapp,
      files,
      latitude,
      longitude
    }: ICreateOrphanages = {
      ...orphanageData,
      latitude: positionMarker.latitude,
      longitude: positionMarker.longitude,
      files: images
    }

    const validationData = {
      ...orphanageData,
      latitude: positionMarker.latitude,
      longitude: positionMarker.longitude,
      files: images
    }

    // FormData = MultiPart Form
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('whatsapp', whatsapp);
    formData.append('about', about);
    formData.append('instructions', instructions);
    formData.append('opening_hours', opening_hours);

    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));

    formData.append('open_on_weekends', String(open_on_weekends));

    files.forEach((file) => {
      formData.append('images', file)
    });
    
    try {
      inputRefs.current?.setErrors({});

      await orphanageFormValidation(validationData);

      setInProgress(true);

      await api.post('/orphanages', formData, {
        onDownloadProgress: () => setInProgress(false)
      });

      modalRef.current?.handleOpenModal();
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        const { validationErrors, markerError } = getValidationErrors(err);
      
        console.log(markerError)

        setPositionMarkerError(markerError);

        return inputRefs.current?.setErrors(validationErrors);
      }  

      alert("Ocorreu um erro inesperado, Tente novamente mais tarde...");
    }

  }, [inputRefs, modalRef, positionMarker]);

  return (
    <PageCreateOrphanage>
      <Sidebar />
      <ModalRegisterOrphanage 
        ref={modalRef}
      />

      <Main>
        <Element name="ScrollToMap" />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <Fieldset>
            <Legend>Dados</Legend>

            <Map 
              center={[-16.221166, -47.934621]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                positionMarker.latitude !== 0 && (
                  <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[positionMarker.latitude, positionMarker.longitude]} 
                  />
                )
              }
            </Map>

            {
              positionMarkerError && (
                <ValidationMapError />
              )
            }

            <InputBlock
              className="input__name"
            >
              <Input
                name="name"
                label="Nome"
                type="text"
              />
            </InputBlock>

            <InputBlock>
              <Input 
                name="about"
                label='Sobre'
                maxLength={300}
                multiline
              />
            </InputBlock>

            <InputBlock>
              <Input 
                id="whatsapp" 
                name="whatsapp"
                label="Número de Whatsapp"
                type="text"
              />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="images">Fotos</Label>
              <InputFile
                name="files"
              />
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <Legend>Visitação</Legend>

            <InputBlock
              className="input__instructions"
            >
              <Input 
                name="instructions"
                label='Instruções'
                multiline
              />
            </InputBlock>
            
            <InputBlock>
              <Input
                id="opening_hours"
                name="opening_hours" 
                label="Horário de funcionamento"
                type="text"
                multiline 
              />
            </InputBlock>

            <InputBlock>
              <Label htmlFor="open_on_weekends">Atende fim de semana</Label>

              <ButtonSelect>
                <Button 
                  type="button"
                  active={open_on_weekends ? true : false}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </Button>

                <Button
                  active={!open_on_weekends ? true : false}
                  onClick={() => setOpenOnWeekends(false)}
                  type="button"
                >
                  Não
                </Button>
              </ButtonSelect>
            </InputBlock>
          </Fieldset>

          <ConfirmButton
            className="submit__button"
            type="submit"
            isLoading={inProgress}
          >
            Confirmar
          </ConfirmButton>
        </Form>
      </Main>
    </PageCreateOrphanage>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
