import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../assets/images/marker.png';

import { 
  Container, 
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText
} from '../styles/screens/orphanages-map-styles';

export default function OrphanagesMap() {
  const { navigate } = useNavigation()

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigate('OrphanagesDetails');
  }, [navigate]);

  const handleNavigateToOrphanage = useCallback(() => {
    navigate('SelectMapPosition');
  }, [navigate]);

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        initialRegion={{
          latitude: -16.2508371,
          longitude: -47.9225178,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008 
        }}
      >
        <Marker 
          icon={mapMarker}
          calloutAnchor={{
            x: 2.8,
            y: 0.9
          }}
          coordinate={{ // posição do marker
            latitude: -16.2508371,
            longitude: -47.9225178,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <CalloutContainer>
              <CalloutText>Lar das Meninas</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </MapView>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>

        <RectButton style={{
          width: 56,
          height: 56,
          backgroundColor: '#15c3d6',
          borderRadius: 20,

          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={handleNavigateToOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </Footer>
    </Container>
  );
}