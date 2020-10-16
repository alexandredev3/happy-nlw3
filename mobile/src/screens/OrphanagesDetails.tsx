import React from 'react';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarkerImg from '../assets/images/marker.png';

import {
  Container,
  ImagesContainer,
  Image,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItemBlue,
  ScheduleTextBlue,
  ScheduleItemGreen,
  ScheduleTextGreen,
  ContactButtonText
} from '../styles/screens/orphanage-detail-styles';

function OrphanagesDetails() {
  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
        {/* pagingEnabled: ele faz uma "paginação", não deixa a imagem pela metade na rolagem */}
          <Image source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>Orf. Esperança</Title>
        <Description>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</Description>
      
        <MapContainer>
          <MapView
            initialRegion={{
              latitude: -27.2092052,
              longitude: -49.6401092,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={{
              width: '100%',
              height: 150,
            }}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: -27.2092052,
                longitude: -49.6401092
              }}
            />
          </MapView>

          <RoutesContainer>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>
      
        <Separator />

        <Title>Instruções para visita</Title>
        <Description>Venha como se sentir a vontade e traga muito amor e paciência para dar.</Description>

        <ScheduleContainer>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleTextBlue>Segunda à Sexta 8h às 18h
            </ScheduleTextBlue>
          </ScheduleItemBlue>

          <ScheduleItemGreen>
            <Feather name="info" size={40} color="#39CC83" />
            <ScheduleTextGreen>Atendemos fim de semana
            </ScheduleTextGreen>
          </ScheduleItemGreen>
        </ScheduleContainer>

        <RectButton style={{
          backgroundColor: '#3CDC8C',
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 56,
          marginTop: 40,
        }} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </RectButton>
      </DetailsContainer>
    </Container>
  );
}


export default OrphanagesDetails;
