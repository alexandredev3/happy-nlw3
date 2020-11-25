import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 100vh;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
`;

export const BackgroundContent = styled.div`

`;

export const Description = styled.div`
  margin-top: 100px;
  text-align: center;
  font-size: 24px;

  > strong {
    font-weight: 800;
  }

  > p {
    font-weight: 600;
  }
`;