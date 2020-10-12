import styled from 'styled-components';

export const PageMap = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  // div que fica por voltar de todo o mapa.
  .leaflet-container {
    z-index: 5;
  }
`;

export const Aside = styled.aside`
  width: 448px;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
  padding: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-top: 64px;
  }

  p {
    line-height: 28px;
    margin-top: 24px;
  }
`;

export const Header = styled.header`

`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;

  line-height: 24px;

  > strong {
    font-weight: 800;
  }
`;

export const CreateOrphanagesButton = styled.div`
  position: absolute;
  right: 40px;
  bottom: 40px;

  z-index: 10;

  width: 64px;
  height: 64px;
  background: #15c3d6;
  border-radius: 28px;

  display: flex;
  justify-content: center;

  > a {
    display: flex;
    align-items: center;
  }

  transition: background 0.2s;

  &:hover {
    background: #17d6eb;
  }
`;