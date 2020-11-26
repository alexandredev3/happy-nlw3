import React, { HTMLAttributes } from 'react';

import { Container } from '../styles/components/button';

const Button: React.FC<HTMLAttributes<HTMLElement>> = ({ children, ...rest }) => {
  return (
    <Container
      {...rest}
    >
      { children }
    </Container>
  );
}

export default Button;