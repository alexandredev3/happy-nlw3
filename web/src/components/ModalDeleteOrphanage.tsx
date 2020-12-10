import React, { useCallback, useState, forwardRef, useImperativeHandle, ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import modalImage from '../assets/images/modal-image-delete.svg';

import RemoveScroll from '../styles/Scroll';

import { 
  Container,
  Content,
  WrapperButton,
  Button,
  ImageContainer,
} from '../styles/components/modal-delete-orphanage';

export interface IModalHandles {
  handleOpenModal: () => void;
}

const ModalRegisterOrphanage: React.RefForwardingComponent<IModalHandles> = ({}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsVisible(true)
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false)
  }, []);

  const handleDeleteOrphanage = useCallback(() => {
    alert("Orfanato excluido com sucesso!");
    setIsVisible(false);
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
        <h1>Excluir!</h1>
        <p>
          Você tem certeza que quer
          excluir Orf. Esperança?
        </p>
        <WrapperButton>
          <Button 
            className="confirm__button" 
            onClick={handleDeleteOrphanage}
          >
            Sim
          </Button>
          <Button 
            className="close__button" 
            onClick={handleCloseModal}
          >
            Não
          </Button>
        </WrapperButton>
      </Content>
      <ImageContainer>
        <img src={modalImage} alt="Imagem do modal"/>
      </ImageContainer>
    </Container>
  );
}

export default forwardRef(ModalRegisterOrphanage);