import React, { useCallback, useState, useRef } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Element, scroller } from 'react-scroll';
import * as Yup from 'yup';

import mapIcon from '../utils/mapIcon';

import Sidebar from "../components/Sidebar";
import Input from '../components/Input';
import InputFile from '../components/FileInput';
import ConfirmButton from '../components/Button';
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
  Button,
  ValidationErrorContainer
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

    function fileSizeValidation(files: File[]) {
      let isValid = true;

      if (files) {
        files.map((file) => {
          const limitSize = 4 * 1024 * 1024;

          if (file.size > limitSize) {
            return isValid = false;
          }
        })
      }

      return isValid;
    }

    function fileTypeValidation(files: File[]) {
      let isValid = true;

      if (files) {
        files.map((file) => {
          const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

          if (!validTypes.includes(file.type)) {
            isValid = false;
          }
        })
      }

      return isValid;
    }
    
    try {
      inputRefs.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup
          .string()
          .required('Nome é obrigatório'),
        whatsapp: Yup
          .string()
          .required('Whatsapp é obrigatório'),
        about: Yup
          .string()
          .required('Sobre é obrigatório'),
        instructions: Yup
          .string()
          .required('Instruções é obrigatório'),
        opening_hours: Yup
          .string()
          .required('Horário de funcionamento é obrigatório'),
        files: Yup
          .array()
          .test(
            'maximum size reached.',
            'Tamanho máximo é de 4MB.',
            (value) => fileSizeValidation(value as File[])
          )
          .test(
            'Invalid Type',
            'Tipo da imagem é invalida.',
            (value) => fileTypeValidation(value as File[])
          )
          .required('Deve ter pelo menos 1 imagem.'),
        latitude: Yup
          .number()
          .required()
          .test(
            'no location selected',
            'latitude must not be 0',
            (value) => {
              return value != 0;
            }
          ),
        longitude: Yup
          .number()
          .required()
          .test(
            'no location selected',
            'longitude must not be 0',
            (value) => {
              return value != 0;
            }
          ),
      })

      await schema.validate(validationData, {
        abortEarly: false
      })

      setInProgress(true);

      await api.post('/orphanages', formData, {
        onDownloadProgress: () => setInProgress(false)
      });

      modalRef.current?.handleOpenModal();
    } catch(err) {
      const validationErrors: IValidationError = {};

      console.log(err)

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;

          if (error.type === 'no location selected') {
            scroller.scrollTo('ScrollToMap', {
              duration: 800,
              smooth: true
            });

            return setPositionMarkerError(true)
          }

          setPositionMarkerError(false)
        });
    
        
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
                <ValidationErrorContainer>
                  <p>Selecione um local no mapa.</p>
                </ValidationErrorContainer>
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
