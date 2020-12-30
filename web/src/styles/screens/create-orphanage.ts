import styled, { css } from 'styled-components';

interface ButtonProps {
  active?: boolean;
}

export const PageCreateOrphanage = styled.div`
  display: flex;
`;

export const Main = styled.main`
  flex: 1;

  form {
    width: 700px;
    margin: 64px auto;

    background: #FFFFFF;
    border: 1px solid #D3E2E5;
    border-radius: 20px;

    padding: 64px 80px;

    overflow: hidden;

    .leaflet-container {

      border: 1px solid #D3E2E5;

      border-radius: 20px;

      z-index: 1;
    }

    .submit__button {
      margin-top: 64px;
    }
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;

  & + & {
    margin-top: 80px;
  }
`;

export const Legend = styled.legend`
  width: 100%;

  font-size: 32px;
  line-height: 34px;
  color: #5C8599;
  font-weight: 700;

  border-bottom: 1px solid #D3E2E5;
  margin-bottom: 40px;
  padding-bottom: 24px;
`;

export const InputBlock = styled.div`
  div:first-child {
    margin-top: 62px;
  }

  & + & {
    margin-top: 54px;
  }

  input[type=file] {
    display: none;
  }
`;

export const Label = styled.label`
  display: flex;
  color: #8FA7B3;
  margin-bottom: 8px;
  line-height: 24px;

  > span {
    font-size: 14px;
    color: #8FA7B3;
    margin-left: 24px;
    line-height: 24px;
  }
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
`;

export const ButtonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Button = styled.button<ButtonProps>`
  height: 64px;
  background: #F5F8FA;
  border: 1px solid #D3E2E5;
  color: #5C8599;
  cursor: pointer;

  ${(props) => props.active &&
    css`
      background: #EDFFF6;
      border: 1px solid #A1E9C5;
      color: #37C77F; 
    `
  }

  
  &:first-of-type {
    border-radius: 20px 0px 0px 20px;
  }

  &:last-of-type {
    border-radius: 0 20px 20px 0;
    border-left: 0;
  }
`;

export const ValidationErrorContainer = styled.div`
  margin-top: 16px;
  text-align: center;

  font-size: 18px;
  color: #FF669D;
`;