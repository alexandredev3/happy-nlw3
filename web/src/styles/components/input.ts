import styled, { css } from 'styled-components';

interface Props {
  isFocus: boolean;
  isFilled: boolean;
}

const inputBorderBottom = `
  &::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: #29B6D1;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`

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
    ${inputBorderBottom}
  `}

  ${props => props.isFilled && css`
    ${inputBorderBottom}
  `}

`;

export const Label = styled.label`
  position: absolute;
  color: #8FA7B3;
  top: -28px;
  left: 0;
`;
