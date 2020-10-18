import React, { useCallback, useEffect, useState } from 'react';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator, Linking } from 'react-native';

import api from '../services/api';

import mapMarkerImg from '../assets/images/marker.png';

import {
  LoadingContainer,
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
  ScheduleItemRed,
  ScheduleTextRed,
  ContactButtonText
} from '../styles/screens/orphanage-detail-styles';

interface OrphanageDetailsRouteParams {
  id: number;
}

interface OrphanageItem {
  id: number;
  name: string;
  whatsapp: number;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

function OrphanagesDetails() {
  const [orphanage, setOrphanage] = useState<OrphanageItem>();

  const route = useRoute();

  // dentro do route params temos os parametros que foram passados na navegação no OrphanagesMap.
  // console.log(route.params);

  const params = route.params as OrphanageDetailsRouteParams;

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then((response) => {
      const data = response.data;

      setOrphanage(data);
    }).catch((err) => {
      alert(err)
    });
  }, [params.id]);

  const handleOpenGoogleMapsRoutes = useCallback(() => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`)
  }, [orphanage]);

  const handleOpenWhatsapp = useCallback(() => {
    Linking.openURL(`https://wa.me/${orphanage?.whatsapp}`);
  }, [orphanage])

  if (!orphanage) {
    return (
      <LoadingContainer>
        <ActivityIndicator 
          size={48}
          color="#0089a5"
        />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
        {/* pagingEnabled: ele faz uma "paginação", não deixa a imagem pela metade na rolagem */}
          {
            orphanage.images.map((image) => {
              return (
                <Image 
                  key={image.id}
                  source={{ uri: image.url }} 
                />
              );
            })
          }
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>
          {orphanage.about}
        </Description>
      
        <MapContainer>
          <MapView
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
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
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude)
              }}
            />
          </MapView>

          <RoutesContainer
            onPress={handleOpenGoogleMapsRoutes}
          >
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>
      
        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleTextBlue>
              Segunda à Sexta {orphanage.opening_hours}
            </ScheduleTextBlue>
          </ScheduleItemBlue>

          {
            orphanage.open_on_weekends ? (
              <ScheduleItemGreen>
                <Feather name="info" size={40} color="#39CC83" />
                <ScheduleTextGreen>
                  Atendemos fim de semana
                </ScheduleTextGreen>
              </ScheduleItemGreen>
            ) : (
              <ScheduleItemRed>
                <Feather name="info" size={40} color="#FF669D" />
                <ScheduleTextRed>
                  Não atendemos fim de semana
                </ScheduleTextRed>
              </ScheduleItemRed>
            )
          }
        </ScheduleContainer>

        <RectButton style={{
          backgroundColor: '#3CDC8C',
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 56,
          marginTop: 40,
        }} onPress={handleOpenWhatsapp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </RectButton>
      </DetailsContainer>
    </Container>
  );
}


export default OrphanagesDetails;
