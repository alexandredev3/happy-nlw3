import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';

import mapMarker from '../assets/images/marker.png';

import { 
  Container, 
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText
} from '../styles/screens/orphanages-map-styles';

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
  const { navigate } = useNavigation();
  
  useFocusEffect(() => {
    api.get('/orphanages').then((response) => {
      const data = response.data;

      setOrphanages(data);
    }).catch((err) => {
      alert(err)
    })
  });
  /**
   * useFocusEffect: So vai disparar esse função quando a tela estiver em foco
   * Se o usuario sair dessa tela e voltar, essa função será disparada.
   */

  const handleNavigateToOrphanageDetails = useCallback((id) => {
    navigate('OrphanagesDetails', { id });
    // dessa forma vamos ter acesso ao id do orfanto la na tela de Detalhes.
  }, [navigate]);

  const handleNavigateToCreateOrphanage = useCallback(() => {
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
        {
          orphanages.map((orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.8,
                  y: 0.9
                }}
                coordinate={{ // posição do marker
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <CalloutContainer>
                    <CalloutText>{orphanage.name}</CalloutText>
                  </CalloutContainer>
                </Callout>
              </Marker>
            );
          })
        }
      </MapView>

      <Footer>
        <FooterText>{orphanages.length} orfanatos encontrados</FooterText>

        <RectButton style={{
          width: 56,
          height: 56,
          backgroundColor: '#15c3d6',
          borderRadius: 20,

          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </Footer>
    </Container>
  );
}