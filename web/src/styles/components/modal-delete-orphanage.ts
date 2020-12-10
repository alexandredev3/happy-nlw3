import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #FF669D;
  width: 100%;
  height: 100vh;
  z-index: 2;
`;

export const Content = styled.div`
  width: 390px;
  text-align: center;

  h1 {
    font-size: 80px;
    margin-bottom: 32px;
  }

  p {
    font-size: 24px;
    margin-bottom: 60px;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 12px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  width: 243px;
  height: 64px;
  background: #D6487B;
  border-radius: 20px;

  cursor: pointer;

  a {
    font-family: 'Nunito';
    font-size: 18px;
    color: #FFFF;
    padding: 32px;
    
    text-decoration: none;
  }
`;

export const ImageContainer = styled.div`
`;
