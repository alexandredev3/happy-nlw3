import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from '../styles/components/back-button';

type BackButtonProps = JSX.IntrinsicElements['button'];

const BackButton: React.FC<BackButtonProps> = ({ ...rest }) => {
  const { goBack } = useHistory();

  const props = {
    ...rest,
    type: 'button'
  }

  return (
    <Container
      {...props as BackButtonProps}
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