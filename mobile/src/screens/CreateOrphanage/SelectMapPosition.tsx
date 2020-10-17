import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../assets/images/marker.png';

import {
  Container,
  NextButtonText,
} from '../../styles/screens/CreateOrphanage/select-map-position-styles'

export default function SelectMapPosition() {
  const { navigate } = useNavigation();

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  const handleNextStep = useCallback(() => {
    navigate('OrphanageData', { markerPosition });
  }, [navigate, markerPosition]);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setMarkerPosition(event.nativeEvent.coordinate);
  }, [markerPosition]);

  return (
    <Container>
      <MapView 
        initialRegion={{
          latitude: -16.2508371,
          longitude: -47.9225178,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        onPress={handleSelectMapPosition}
      >
        {
          markerPosition.latitude !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: markerPosition.latitude, 
                longitude: markerPosition.longitude 
              }}
            />
          )
        }
      </MapView>

      {
        markerPosition.latitude !== 0 && (
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
        )
      }
    </Container>
  );
}