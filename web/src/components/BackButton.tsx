import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Container } from '../styles/components/back-button';

interface BackButtonProps {
  path: string;
  arrowDirection: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ path, arrowDirection }) => {
  return (
    <Container>
      <Link to={path}>
        {arrowDirection ? (
          <FiArrowRight size={26} color="#15C3D6" />
        ) : (
          <FiArrowLeft size={26} color="#15C3D6" />
        )}
      </Link>
    </Container>
  );
}

export default BackButton;