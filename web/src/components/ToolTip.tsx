import React from 'react';
import ReactToolTip from 'react-tooltip';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from '../styles/components/tooltip';

interface Props {
  message: string;
}

const ToolTip: React.FC<Props> = ({ message }) => {
  return (
    <Container className="tooltip__container">
      <p 
        data-tip={message} 
      >
        <FiAlertCircle 
          color="#FF669D" 
          size={32} 
        />
      </p>
      <ReactToolTip 
        effect="solid" 
        place="top"
        type="error"
        className="tooltip__content"
        arrowColor="#FF669D"
      />
    </Container>
  );
}

export default ToolTip;