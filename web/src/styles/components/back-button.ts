import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;

  cursor: pointer;

  width: 48px;
  height: 48px;
  background: #EBF2F5;
  border-radius: 16px;

  display: flex;
  justify-content: center;

  transition: background 0.2s;

  > a {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  &:hover {
    background: #f0f3f5;
  }
`;