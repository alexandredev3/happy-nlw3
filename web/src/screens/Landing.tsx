import React from 'react';
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import {
  PageLanding,
  ContentWrapper,
  Main,
  LocationContainer,
  EnterAppButton,
} from '../styles/screens/landing-styles';

import logoImg from '../assets/images/logo.svg';

function Landing() {
  return (
    <PageLanding>
      <ContentWrapper>

        <img src={logoImg} alt="Happy"/>

        <Main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <LocationContainer>
          <strong>Luziânia</strong>
          <span>Goiás</span>
        </LocationContainer>

        <EnterAppButton>
          <Link to="/signin">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </EnterAppButton>

      </ContentWrapper>
    </PageLanding>
  );
};

export default Landing;
