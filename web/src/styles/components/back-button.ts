import styled from 'styled-components';

export const Container = styled.button<any>`
  cursor: pointer;

  width: 48px;
  height: 48px;
  background: #EBF2F5;
  border-radius: 16px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background 0.2s;

  &:hover {
    background: #f0f3f5;
  }
`;