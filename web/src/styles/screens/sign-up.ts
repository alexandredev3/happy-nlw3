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
    
    .back__button {
      position: absolute;
      right: 24px;
      top: 24px;
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
