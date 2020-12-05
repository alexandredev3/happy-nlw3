import React from 'react';
import { IconType } from 'react-icons';

import { Container } from '../styles/components/button';

interface Props {
  Icon?: IconType;
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props;

const Button: React.FC<ButtonProps> = ({ children, Icon, ...rest }) => {
  return (
    <Container
      {...rest as ButtonProps}
    >
      {Icon && (
        <Icon size={24} color="#FFF" />
      )}

      { children }
    </Container>
  );
}

export default Button;