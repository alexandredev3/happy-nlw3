import React, { useCallback, useState } from 'react';
import { RectButton, Switch } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

import {
  Container,
  Title,
  Label,
  TextInput,
  UploadedImagesContainer,
  UploadedImage,
  ImagesInput,
  SwitchContainer,
  NextButtonText,
} from '../../styles/screens/CreateOrphanage/orphanage-data-styles';

interface OrphanageDataRouteParams {
  markerPosition: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const { navigate } = useNavigation();
  const route = useRoute();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const params = route.params as OrphanageDataRouteParams;

  const handleCreateOrphanage = useCallback(async () => {
    const { latitude, longitude } = params.markerPosition;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      // O typescript vai ficar reclamando, porque o formado desse objeto não esta no formado que o append está esperando
      // mas isso e problema na tipagem do react native.
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image
      } as any);
    });

    try {
      await api.post('/orphanages', data);
      navigate('OrphanagesMap');
    } catch(err) {
      alert(err)
    }
  }, [
    name,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    params
  ]);

  const handleSelectImages = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    // requestCameraRollPermissionsAsync, pedir permissão para acessar a galeria de fotos.
    // se não tiver o roll, vai pedir permissão para tirar uma foto na hora.

    if (status !== 'granted') {
      return alert('Precisamos de acesso ás suas fotos!')
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // permitir que o usuario edite a foto antes de subi ela
      quality: 1, // vai de 0 a 1
      mediaTypes: ImagePicker.MediaTypeOptions.Images // o usuario so pode selecionar images
    });

    if (result.cancelled) {
      return;
    }

    // estou apenas renomeando a "uri" para "image"
    const { uri: image } = result;

    setImages([...images, image])
  }, [images]);

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <TextInput
        value={name}
        onChangeText={setName}
        // Vai ser passado o Texto como parametro no onChangeText
        // a mesma coisa de fazer isso: {text => setName(text)}
      />

      <Label>Sobre</Label>
      <TextInput
        style={{ height: 110 }}
        multiline // transforma o input em textarea
        value={about}
        onChangeText={setAbout}
      />

      {/* <Label>Whatsapp</Label>
      <TextInput/> */}
      <Label>Fotos</Label>

      <UploadedImagesContainer>
        {
          images.map((image) => {
            return (
              <UploadedImage 
                key={image}
                source={{ uri: image }}
              />
            );
          })
        }
      </UploadedImagesContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <TextInput
        style={{ height: 110 }}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Label>Horario de visitas</Label>
      <TextInput 
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <RectButton style={{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
      }} onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </RectButton>
    </Container>
  );
}