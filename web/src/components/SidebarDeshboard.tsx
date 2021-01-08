import React from 'react';
import { FiMapPin, FiAlertCircle } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../assets/images/map-marker.svg';

import BackButton from '../components/BackButton';

import {
  Aside,
  Footer,
  Main,
} from '../styles/components/sidebar-dashboard';

const Sidebar: React.FC = () => {
  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <Main>
        <Link to="/dashboard/orphanages" className="orphanages__button" >
          <FiMapPin size={24} color="#FFF" />
        </Link>
        <Link to="/dashboard/pending-orphanages" className="orphanages-pending__button">
          <FiAlertCircle size={24} color="#FFF" />
        </Link>
      </Main>

      <Footer>
        <BackButton />
      </Footer>
   </Aside>
  );
}

export default Sidebar;