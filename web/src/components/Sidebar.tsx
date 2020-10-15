import React, { useCallback } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../assets/images/map-marker.svg';

import {
  Aside,
  Footer,
  Button
} from '../styles/components/sidebar-styles';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <Footer>
        <Button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </Button>
      </Footer>
   </Aside>
  );
}

export default Sidebar;