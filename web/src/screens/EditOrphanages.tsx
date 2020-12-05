import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus, FiX } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import mapIcon from '../utils/mapIcon';

import Sidebar from "../components/Sidebar";
import Input from '../components/Input';
import ConfirmButton from '../components/Button';

import api from "../services/api";

import { 
  PageEditOrphanages,
  Main,
  Fieldset,
  Legend,
  InputBlock,
  ImagesContainer,
  Label,
  ImagesPreview,
  DeleteImageButton,
  NewImageButton,
  ButtonSelect,
  Button
} from '../styles/screens/edit-orphanages'

export default function EditOrphanages() {
  const [positionMarker, setPositionMarker] = useState({ 
    latitude: 0, longitude: 0 
  });
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const inputRefs = useRef<FormHandles>(null);

  const history = useHistory();

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng

    setPositionMarker({
      latitude: lat,
      longitude: lng
    })
  }, [positionMarker]);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    // transformando o event.target.files em um Array.
    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, [images, previewImages]);

  const handleDeleteImages = useCallback((index) => {
    const deleteImage = previewImages.findIndex((_, imageIndex) => imageIndex === index);

    if (deleteImage >= 0) {
      const filteredImagesPreview = previewImages.filter((_, imageIndex) => imageIndex !== index);
      const filteredImages = images.filter((_, imageIndex) => imageIndex !== index);

      setPreviewImages(filteredImagesPreview);
      setImages(filteredImages);
    }

  }, [previewImages, images]);

  const handleSubmit = useCallback(async (data) => {
    // const name = nameInputRef.current?.value;
    // const whatsapp = whatsappInputRef.current?.value;
    // const about = aboutInputRef.current?.value;
    // const instructions = instructionsInputRef.current?.value;
    // const opening_hours = openingHoursInputRef.current?.value;

    // const { latitude, longitude } = positionMarker;

    // if (!name || !whatsapp || !about || !instructions || !opening_hours) {
    //   return alert("Todos os campos são obrigatorios");
    // }

    // // FormData = MultiPart Form
    // const data = new FormData();
    
    // data.append('name', name);
    // data.append('whatsapp', whatsapp);
    // data.append('about', about);
    // data.append('instructions', instructions);
    // data.append('opening_hours', opening_hours);

    // data.append('latitude', String(latitude));
    // data.append('longitude', String(longitude));

    // data.append('open_on_weekends', String(open_on_weekends));

    // images.forEach((image) => {
    //   data.append('images', image)
    // });

    // try {
    //   const { push } = history;

    //   await api.post('/orphanages', data);

    //   alert("Cadastro realizado com sucesso!");
    //   push('/app');
    // } catch(err) {
    //   alert("Ocorreu um erro inesperado, Tente novamente mais tarde...");
    //   console.log(err);
    // }

  }, [inputRefs]);

  return (
    <PageEditOrphanages>
      <Sidebar />

      <Main>
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

            <InputBlock>
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

              <ImagesContainer>
                {
                  previewImages.map((imageUrl, index) => {
                    return (
                      <ImagesPreview
                        key={imageUrl}
                      >
                        <img
                          src={imageUrl}
                        />
                        <DeleteImageButton
                            type="button"
                            onClick={() => handleDeleteImages(index)}
                          >
                          <FiX size={24} color="#FF669D" />
                        </DeleteImageButton>
                      </ImagesPreview>
                    )
                  })
                }     

                <NewImageButton htmlFor="images[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImageButton>
              </ImagesContainer>

              <input 
                type="file" 
                id="images[]"
                onChange={handleSelectImages}
              />
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <Legend>Visitação</Legend>

            <InputBlock>
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
          >
            Confirmar
          </ConfirmButton>
        </Form>
      </Main>
    </PageEditOrphanages>
  );
}