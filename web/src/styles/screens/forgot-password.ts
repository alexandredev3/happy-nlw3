import styled from 'styled-components';

export const ForgotPasswordPage = styled.div`
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

      margin-top: 32px;

      font-weight: 800;
      text-decoration: none;

      cursor: pointer;
    }
  }
`;

export const FormContent = styled.div`
  max-width: 400px;
  width: 100%;
`;

export const HeaderForm = styled.div`
  color: #5C8599;
  margin-bottom: 70px;

  > h2 {
    margin-bottom: 24px;
  }
`;
