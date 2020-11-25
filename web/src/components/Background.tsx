import React from 'react';

import {
  BackgroundContainer,
  BackgroundContent,
  Description,
} from '../styles/components/background';

import logotipoImage from '../assets/images/logotipo.svg'

const Background = () => {
  return (
    <BackgroundContainer>
      <BackgroundContent>
        <img src={logotipoImage} alt="Happy"/>
        <Description>
          <strong>Luziânia</strong>
          <p>Goiás</p>
        </Description>
      </BackgroundContent>
    </BackgroundContainer>
  );
}

export default Background;