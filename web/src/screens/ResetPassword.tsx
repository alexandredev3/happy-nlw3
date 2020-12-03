import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { 
  ForgotPasswordPage,
  Container,
  FormContent,
  HeaderForm
} from '../styles/screens/reset-password';

import Background from '../components/Background';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ResetPassword() {
  const inputRefs = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    alert('Enviado com sucesso!');
  }, [inputRefs]);

  return (
    <ForgotPasswordPage>
      <Container>
        <Background />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <FormContent>
            <HeaderForm>
              <h2>Redefinição de senha</h2>
              <p>
                Escolha uma nova senha para você
                acessar o dashboard do Happy
              </p>
            </HeaderForm>

            <Input 
              name="password"
              label="Nova Senha"
              type="password"
            />
            <Input 
              name="confirm_password"
              label="Repetir"
              type="password"
            />

            <Button 
              className="create__button"
              type="submit"
            >
              Enviar
            </Button>
          </FormContent>
        </Form>
      </Container>
    </ForgotPasswordPage>
  );
}