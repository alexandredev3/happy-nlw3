import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Container, Title } from '../styles/components/header-styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleGoBackToAppHomePage = useCallback(() => {
    navigation.navigate('OrphanagesMap')
  }, [navigation]);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather 
          name="arrow-left"
          size={24}
          color="#15b6d6"
        />
      </BorderlessButton>

      <Title>{title}</Title>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomePage}>
          <Feather 
            name="x"
            size={24}
            color="#ff669d"
          />
        </BorderlessButton>
      ) : (
        <View />
        // Colocamos uma View em branco aqui, porque temos um jusitfy-content: space-between;
      )}
    </Container>
  );
}

export default Header;
