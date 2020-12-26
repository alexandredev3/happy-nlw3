import styled, { css, keyframes } from 'styled-components';

interface Props {
  isFocus: boolean;
  isFilled: boolean;
  isMultiline?: boolean;
  error: string | undefined;
}

const input = css`
  display: flex;
  margin-top: 8px;
  height: 64px;
  padding: 0 16px;

  width: 100%;
  background: #F5F8FA;

  border: 1px solid #D3E2E5;
  border-radius: 20px;
`;

const textarea = css`
  display: flex;
  min-height: 120px;
  max-height: 240px;
  resize: vertical;
  padding: 16px;
  line-height: 28px;

  width: 100%;
  background: #F5F8FA;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  outline: none;
  color: #5C8599;
`;

export const Container = styled.div<Props>`
  position: relative;

  ${props => props.isMultiline ? textarea : input }

  & + & {
    margin-top: 56px;
  }

  > input {
    flex: 1;
    /* background: transparent; */
    border: 0;
    outline: none;
    color: #5C8599;
  }

  > textarea {
    flex: 1;
    border: 0;
    outline: none;
    color: #5C8599;
    background: none;
    resize: none;
  }

  .tooltip__container {
    position: absolute;
    top: 14px;
    bottom: 0;
    right: -45px;
  }

  ${props => props.isFocus && css`
    border: 1px solid #37C77F;
  `}

  ${props => props.isFilled && css`
    border: 1px solid #37C77F;
  `}

  ${props => props.error && css`
    border: 1px solid #FF669D;
  `}
`;

export const Label = styled.label`
  position: absolute;
  color: #8FA7B3;
  top: -34px;
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