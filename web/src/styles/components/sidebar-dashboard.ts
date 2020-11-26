import styled, { css } from 'styled-components';

export const Aside = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 48px;
  }
`;

export const Main = styled.main`
  a {
    margin: 12px 0;

    width: 48px;
    height: 48px;
    background: #12AFCB;

    border: 0;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 16px;

    &:hover {
      background: #17D6EB;
    }
  }
`;

export const Footer = styled.footer`
  > a {
    width: 48px;
    height: 48px;

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
  }
`;

export const Button = styled.button`
  width: 48px;
  height: 48px;

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