import styled from 'styled-components';

export const SignUpPage = styled.div`
  width: 100%;
  background: #FFF;
`;

export const Container = styled.div`
  display: flex;
  
  form {
    display: flex;
    align-items: center;
    margin: 0 auto;
    
    div:first-child {
      top: 24px;
      left: 24px;
      right: 0;
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

  > button {
    margin: 26px 0;
  }
`;
