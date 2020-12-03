import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { 
  SignUpPage,
  Container,
  FormContent
} from '../styles/screens/sign-up';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignUp() {
  const inputRefs = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data) => {
    console.log('Sucesso!')
  }, [])

  return (
    <SignUpPage>
      <Container>
        <Background />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <BackButton
            className="back__button"
            path="/signin"
          />

          <FormContent>
            <h2>Criar uma nova conta</h2>
            
            <Input
              autoComplete="on"
              label="Nome"
              name="name"
              type="text"
            />

            <Input 
              autoComplete="on"
              label="E-mail"
              name="email"
              type="email"
            />

            <Input 
              label="Senha"
              name="password"
              type="password"
            />

            <Input 
              label="Sua senha novamente"
              name="confirm-password"
              type="password"
            />

            <Button type="submit">Entrar</Button>
          </FormContent>
        </Form>
      </Container>
    </SignUpPage>
  );
}