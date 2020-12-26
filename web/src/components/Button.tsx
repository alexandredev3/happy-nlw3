import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FiCircle } from 'react-icons/fi';
import { Variants } from 'framer-motion';

import { Container, AnimatedCircle } from '../styles/components/button';

interface Props {
  Icon?: IconType;
  isLoading?: boolean;
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props;

const Button: React.FC<ButtonProps> = ({ children, Icon, isLoading, ...rest }) => {

  const variants: Variants = {
    hidden: { opacity: 0.7, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <Container
      {...rest as ButtonProps}
      isLoading={isLoading}
    >
      {Icon && (
        <Icon size={24} color="#FFF" />
      )}

      { isLoading ? (
        <AnimatedCircle
          initial="hidden"
          animate="visible"
          transition={{ 
            repeat: Infinity, 
            duration: 0.6, 
            repeatType: "mirror", 
            ease: 'easeInOut' 
          }}
          variants={variants}
        >
          <FiCircle size={45} />
        </AnimatedCircle>
      ) : [ children ] }
    </Container>
  );
}

export default Button;