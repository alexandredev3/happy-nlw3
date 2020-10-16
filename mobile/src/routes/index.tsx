import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import OrphanagesMap from '../screens/OrphanagesMap';
import OrphanagesDetails from '../screens/OrphanagesDetails';

import SelectMapPosition from '../screens/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../screens/CreateOrphanage/OrphanageData';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />

        <Screen 
          name="OrphanagesDetails" 
          component={OrphanagesDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />
            // e uma função que rendelizar um componente
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
            // e uma função que rendelizar um componente
          }}
        />
        <Screen 
          name="OrphanageData" 
          component={OrphanageData} 
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
            // e uma função que rendelizar um componente
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
