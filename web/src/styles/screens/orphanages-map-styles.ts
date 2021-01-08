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

  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 28px;
    box-shadow: none;
  }

  .map-popup .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .map-popup .leaflet-popup-content a {
    width: 40px;
    height: 40px;
    background: #15c3d6;
    box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .map-popup .leaflet-popup-tip-container {
    display: none;
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

export const LogOutButton = styled.button`
  width: 48px;
  height: 48px;

  margin-top: 20px;

  border: 0;

  background: #12AFCB;
  border-radius: 16px;

  cursor: pointer;

  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #17D6EB;
  }
`;

export const DashboardButton = styled.div`
  position: absolute;
  right: 124px;
  top: 45px;

  z-index: 10;

  width: 222px;
  height: 56px;
  background: #15c3d6;
  border-radius: 28px;

  display: flex;
  justify-content: center; 
  align-items: center;

  > a {
    color: #FFFF;
    font-weight: 800;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 15px;
  }

  transition: background 0.2s;

  &:hover {
    background: #17d6eb;
  }

  cursor: pointer;
`;

export const NotificationButton = styled.div`
  position: absolute;
  right: 40px;
  top: 40px;

  z-index: 10;

  width: 64px;
  height: 64px;
  background: #15c3d6;
  border-radius: 28px;

  display: flex;
  justify-content: center; 
  align-items: center;

  > a {
    display: flex;
    align-items: center;
    padding: 15px;
  }

  transition: background 0.2s;

  &:hover {
    background: #17d6eb;
  }

  cursor: pointer;
`;

export const UnreadNotificationsText = styled.div`
  position: absolute;
  top: 14px;
  right: 30px;

  display: flex;
  justify-content: center; 
  align-items: center;
  background: #15c3d6;
  color: #FFF;
  width: 28px;
  height: 20px;
  border-radius: 20px;

  > a {
    padding: 10px;
  }
`;
