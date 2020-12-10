import React, { useCallback, useState, forwardRef, useImperativeHandle, ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import modalImage from '../assets/images/modal-image-register.svg';

import RemoveScroll from '../styles/Scroll';

import { 
  Container,
  Content,
  Button,
  ImageContainer,
} from '../styles/components/modal-register-orphanage';

export interface IModalHandles {
  handleOpenModal: () => void;
}

const ModalRegisterOrphanage: React.RefForwardingComponent<IModalHandles> = ({}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsVisible(true)
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal
    }
  })

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <RemoveScroll hide={isVisible} />
      <Content>
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado
          ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <Button>
          <Link to="/app">Voltar para o mapa</Link>
        </Button>
      </Content>
      <ImageContainer>
        <img src={modalImage} alt="Imagem do modal"/>
      </ImageContainer>
    </Container>
  );
}

export default forwardRef(ModalRegisterOrphanage);