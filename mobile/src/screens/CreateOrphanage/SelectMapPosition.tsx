import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import mapMarkerImg from '../../assets/images/marker.png';

import {
  Container,
  NextButtonText,
} from '../../styles/screens/CreateOrphanage/select-map-position-styles'

export default function SelectMapPosition() {
  const { navigate } = useNavigation();

  const handleNextStep = useCallback(() => {
    navigate('OrphanageData');
  }, [navigate]);

  return (
    <Container>
      <MapView 
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </MapView>

      <RectButton style={{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
    
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
      }} onPress={handleNextStep}>
        <NextButtonText>Próximo</NextButtonText>
      </RectButton>
    </Container>
  );
}