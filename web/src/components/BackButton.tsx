import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Container } from '../styles/components/back-button';

interface BackButtonProps extends HTMLAttributes<HTMLElement>{
  path: string;
  arrowDirection: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ path, arrowDirection, ...rest }) => {
  return (
    <Container
      {...rest}
    >
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