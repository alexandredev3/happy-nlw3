import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #37C77F;
  border-radius: 20px;
  color: #FFFFFF;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  > svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36CF82;
  }
`;