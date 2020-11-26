import styled, { css } from 'styled-components';

const ButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  background: #EBF2F5;

  border-radius: 16px;
`;

export const Container = styled.div`
  max-width: 450px;
  width: 100%;
  height: 270px;

  border: 1px solid #D3E2E5;
  border-radius: 20px;

  background: #FFFF;
`;

export const MapContent = styled.div`
  width: 100%;
  height: 200px;

  .leaflet-container {
    border-bottom: 1px solid #D3E2E5;
    border-radius: 20px;
  }
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 18px;
  font-size: 14px;
  color: #4D6F80;
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
`;

export const EditButton = styled.div`
  margin-right: 8px;
  ${ButtonStyles}
`;

export const DeleteButton = styled.div`
  ${ButtonStyles}
`;

