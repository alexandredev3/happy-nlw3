import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from '../styles/components/back-button';

type BackButtonProps = JSX.IntrinsicElements['button'];

const BackButton: React.FC<BackButtonProps> = ({ ...rest }) => {
  const { goBack } = useHistory();

  return (
    <Container
      {...rest as BackButtonProps}
    >
      <FiArrowLeft
        onClick={goBack}
        size={26} 
        color="#15C3D6"
      />
    </Container>
  );
}

export default BackButton;