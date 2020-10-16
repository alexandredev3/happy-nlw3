import React from 'react';
import { RectButton, Switch } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Title,
  Label,
  TextInput,
  ImagesInput,
  SwitchContainer,
  NextButtonText,
} from '../../styles/screens/CreateOrphanage/orphanage-data-styles';

export default function OrphanageData() {
  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <TextInput />

      <Label>Sobre</Label>
      <TextInput
        style={{ height: 110 }}
        multiline // transforma o input em textarea
      />

      <Label>Whatsapp</Label>
      <TextInput/>

      <Label>Fotos</Label>
      <ImagesInput onPress={() => {}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <TextInput
        style={{ height: 110 }}
        multiline
      />

      <Label>Horario de visitas</Label>
      <TextInput />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </SwitchContainer>

      <RectButton style={{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
      }} onPress={() => {}}>
        <NextButtonText>Cadastrar</NextButtonText>
      </RectButton>
    </Container>
  );
}