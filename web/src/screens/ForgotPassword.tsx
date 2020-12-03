import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { 
  ForgotPasswordPage,
  Container,
  FormContent,
  HeaderForm
} from '../styles/screens/forgot-password';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPassword() {
  const inputRefs = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    alert('Enviado com sucesso!');
  }, [inputRefs]);

  return (
    <ForgotPasswordPage>
      <Container>
        <Background />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <BackButton
            className="back__button"
            path="/signin"
            arrowDirection={false}
          />

          <FormContent>
            <HeaderForm>
              <h2>Esqueci a senha</h2>
              <p>
                Sua redefinição de senha será enviada
                para o e-mail cadastrado.
              </p>
            </HeaderForm>

            <Input 
              name="email"
              label="E-mail"
              type="text"
            />

            <Button className="create__button">
              Enviar
            </Button>
          </FormContent>
        </Form>
      </Container>
    </ForgotPasswordPage>
  );
}