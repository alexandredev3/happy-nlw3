import React from 'react';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../assets/images/map-marker.svg';

import BackButton from '../components/BackButton'

import {
  Aside,
  Footer,
} from '../styles/components/sidebar-styles';

const Sidebar: React.FC = () => {
  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <Footer>
        <BackButton />
      </Footer>
   </Aside>
  );
}

export default Sidebar;