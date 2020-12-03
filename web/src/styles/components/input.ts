import styled, { css, keyframes } from 'styled-components';

interface Props {
  isFocus: boolean;
  isFilled: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  margin-top: 8px;
  height: 64px;
  padding: 0 16px;

  width: 100%;
  background: #F5F8FA;

  border: 1px solid #D3E2E5;
  border-radius: 20px;

  position: relative;

  & + & {
    margin-top: 46px;
  }

  > input {
    flex: 1;
    /* background: transparent; */
    border: 0;
    outline: none;
    color: #5C8599;
  }

  ${props => props.isFocus && css`
    border: 1px solid #37C77F;
  `}

  ${props => props.isFilled && css`
    border: 1px solid #37C77F;
  `}
`;

export const Label = styled.label`
  position: absolute;
  color: #8FA7B3;
  top: -28px;
  left: 0;
`;

export const VisibleButton = styled.button`
  position: absolute;
  top: 4px;
  bottom: 0;
  right: 25px;

  border: 0;
  outline: none;

  cursor: pointer;
`;
