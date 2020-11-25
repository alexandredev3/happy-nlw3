import React from 'react';

import { Container } from '../styles/components/button';

const Button: React.FC = ({ children }) => {
  return (
    <Container>
      { children }
    </Container>
  );
}

export default Button;