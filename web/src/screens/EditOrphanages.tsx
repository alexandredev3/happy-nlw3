import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus, FiX } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from "react-router-dom";
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Element } from 'react-scroll';
import url from 'url';
import * as Yup from 'yup';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { orphanageFormValidation, getValidationErrors } from '../utils/orphanageFormValidation';

import Sidebar from "../components/Sidebar";
import Input from '../components/Input';
import ConfirmButton from '../components/Button';
import ValidationMapError from '../components/ValidationMapError';

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

interface Orphanage {
  id: string;
  name: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: string;
    url: string;
  }>
}

interface Image {
  id?: string;
  url: string;
}

interface OrphanageCardParams {
  orphanage_id: string;
}

export default function EditOrphanages() {
  const params = useParams<OrphanageCardParams>();

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<Image[]>([]);
  const [orphanage, setOrphanage] = useState<Orphanage>({
    id: params.orphanage_id,
    name: '',
    about: '',
    instructions: '',
    opening_hours: '',
    whatsapp: '',
    latitude: 0,
    longitude: 0,
    images: [
      {
        id: '',
        url: ''
      }
    ],
    open_on_weekends: false
  });
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [positionMarker, setPositionMarker] = useState({ 
    latitude: 0, longitude: 0
  });
  const [positionMarkerError, setPositionMarkerError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const { push } = useHistory();

  const inputRefs = useRef<FormHandles>(null);

  useEffect(() => {
    const { orphanage_id } = params;

    api.get(`/orphanages/${orphanage_id}`)
      .then((response) => {
        const orphanage: Orphanage = response.data;

        const data: Orphanage = {
          ...orphanage,
          latitude: orphanage.latitude,
          longitude: orphanage.longitude,
        }

        const files = orphanage.images.map((image) => {
          const { url: uri } = image;
          const fileName = url.parse(uri).pathname?.substr(9);
    
          const blob = new Blob();
    
          if (fileName) {
            const [ _, fileType ] = fileName.split('.')
    
            return new File([blob], fileName, { 
              type: `image/${fileType.replace('.', '')}` 
            })
          }

          return new File([blob], '');
        });

        setOrphanage(data);
        setPositionMarker({
          latitude: data.latitude,
          longitude: data.longitude
        });
        setOpenOnWeekends(data.open_on_weekends);
        setPreviewImages(orphanage.images);
        setFiles(files);

        const inputNameRef = inputRefs.current?.getFieldRef("name");
        const inputWhatsappRef = inputRefs.current?.getFieldRef("whatsapp");
        const inputAboutRef = inputRefs.current?.getFieldRef("about");
        const inputInstructionsRef = inputRefs.current?.getFieldRef("instructions");
        const inputOpeningHoursRef = inputRefs.current?.getFieldRef("opening_hours");

        inputNameRef.value = orphanage.name;
        inputWhatsappRef.value = orphanage.whatsapp;
        inputAboutRef.value = orphanage.about;
        inputInstructionsRef.value = orphanage.instructions;
        inputOpeningHoursRef.value = orphanage.opening_hours;
      })
      .catch((error) => {
        return alert(error);
      })
  }, []);

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
    setFiles(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    }) as unknown as Image[];

    const images = selectedImagesPreview.map((image) => {
      return {
        id: '',
        url: image
      };
    }) as unknown as Image[]

    setPreviewImages(images);
  }, [images, previewImages]);

  const handleDeleteImages = useCallback(async (index) => {
    const deleteImagePreview = previewImages.findIndex((_, imageIndex) => imageIndex === index);
    const deleteImages = images.findIndex((_, imageIndex) => imageIndex === index);
    const deleteFileObject = images.findIndex((_, fileIndex) => fileIndex === index);

    if (deleteImagePreview >= 0) {
      const filteredImagesPreview = previewImages.filter((_, imageIndex) => imageIndex !== index);

      const { id } = previewImages[index];

      if (id) {
        await api.delete(`/orphanages/images/${id}`);
      }

      setPreviewImages(filteredImagesPreview);
    }

    if (deleteImages >= 0) {
      const filteredImages = images.filter((_, imageIndex) => imageIndex !== index);

      setImages(filteredImages);
    }

    if (deleteFileObject >= 0) {
      const filteredFiles = files.filter((_, fileIndex) => fileIndex !== index);

      setFiles(filteredFiles);
    }

  }, [previewImages, images]);

  const handleSubmit = useCallback(async (orphanageData: ICreateOrphanages) => {
    const { 
      name,
      about,
      instructions,
      opening_hours,
      whatsapp,
      latitude,
      longitude
    }: ICreateOrphanages = {
      ...orphanageData,
      latitude: positionMarker.latitude,
      longitude: positionMarker.longitude,
    }

    const validationData = {
      ...orphanageData,
      latitude: positionMarker.latitude,
      longitude: positionMarker.longitude,
      files
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

    images.forEach((image) => {
      formData.append('images', image)
    });
    
    try {
      inputRefs.current?.setErrors({});

      await orphanageFormValidation(validationData);

      setInProgress(true);

      await api.put(`/orphanages/${params.orphanage_id}`, formData, {
        onDownloadProgress: () => setInProgress(false)
      });

      alert("Orfanato atualizado com sucesso!");

      push('/dashboard/orphanages');

    } catch(err) {
      console.log(err)

      if (err instanceof Yup.ValidationError) {
        const { validationErrors, markerError } = getValidationErrors(err);
        
        setPositionMarkerError(markerError);

        return inputRefs.current?.setErrors(validationErrors);
      }

      alert("Ocorreu um erro inesperado, Tente novamente mais tarde...");
    }
  }, [inputRefs, positionMarker, images, files]);

  return (
    <PageEditOrphanages>
      <Sidebar />

      <Main>
        <Element name="ScrollToMap" />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <Fieldset>
            <Legend>Dados</Legend>

            <Map 
              center={[orphanage.latitude, orphanage.longitude]}
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
                  previewImages.map((image, index) => {
                    return (
                      <ImagesPreview
                        key={image.url}
                      >
                        <img
                          src={image.url}
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
                multiple
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
            isLoading={inProgress}
          >
            Confirmar
          </ConfirmButton>
        </Form>
      </Main>
    </PageEditOrphanages>
  );
}