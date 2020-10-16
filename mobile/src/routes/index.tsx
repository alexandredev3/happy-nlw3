import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from '../screens/OrphanagesMap';
import OrphanagesDetails from '../screens/OrphanagesDetails';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanagesDetails" component={OrphanagesDetails} />
      </Navigator>
    </NavigationContainer>
  );
};
