import styled from 'styled-components';

import landingImg from '../../assets/images/landing.svg';

export const PageLanding = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  position: relative;

  max-width: 1100px;
  width: 100%;

  max-height: 580px;
  height: 100%;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${landingImg}) no-repeat 80% center;
  background-size: 43%;

  @media (max-height: 600px) {
    max-height: 534px;
    height: 100%;

    background-size: 40%;
  }
`;

export const Main = styled.main`
  max-width: 350px;

  > h1 {
    font-size: 76px;
    font-weight: 900;
    line-height: 70px;
  }

  > p {
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }
`;

export const LocationContainer = styled.div`
  position: absolute;
  right: 0; 
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;

  > strong {
    font-weight: 800;
  }
`;

export const EnterAppButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  cursor: pointer;

  width: 80px;
  height: 80px;
  background: #ffd666;
  border-radius: 30px;

  display: flex;
  justify-content: center;

  transition: background 0.2s;

  > a {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  &:hover {
    background: #96FEFF;
  }
`;
