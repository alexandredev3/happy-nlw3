import React, { ButtonHTMLAttributes } from 'react';

import { Container } from '../styles/components/button';

const Button: React.FC<ButtonHTMLAttributes<HTMLElement>> = ({ children, ...rest }) => {
  return (
    <Container
      {...rest}
    >
      { children }
    </Container>
  );
}

export default Button;