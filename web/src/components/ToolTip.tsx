import React from 'react';
import ReactToolTip from 'react-tooltip';

import { Container } from '../styles/components/tooltip';

interface Props {
  message: any;
  backgroundColor?: string;
}

const ToolTip: React.FC<Props> = ({ 
  message,
  backgroundColor = '#FF6690',
  children
}) => {
  return (
    <Container className="tooltip__container">
      <p 
        data-tip={message} 
      >
        {children}
      </p>
      <ReactToolTip 
        effect="solid" 
        place="top"
        type="error"
        className="tooltip__content"
        arrowColor={backgroundColor}
        backgroundColor={backgroundColor}
      />
    </Container>
  );
}

export default ToolTip;