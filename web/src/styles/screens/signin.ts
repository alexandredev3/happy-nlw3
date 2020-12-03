import styled from 'styled-components';

export const SigninPage = styled.div`
  width: 100%;
  background: #FFF;
`;

export const Container = styled.div`
  display: flex;

  form {
    display: flex;
    align-items: center;
    margin: 0 auto;

    .back__button {
      position: absolute;
      right: 24px;
      top: 24px;
    }

    .create__button {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 12px;
      color: #37C77F;
      font-weight: 800;
      text-decoration: none;

      cursor: pointer;
    }
  }
`;

export const FormContent = styled.div`
  min-width: 400px;
  width: 100%;

  > h2 {
    color: #5C8599;
    margin-bottom: 70px;
  }
`;

export const RememberLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  color: #8FA7B3;

  > a {
    text-decoration: none;
    color: #8FA7B3;
  }
`;

export const InputCheckbox = styled.div`
  margin: 24px 0;

  > span {
    margin-left: 10px;
  }
`;

