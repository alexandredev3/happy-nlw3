import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { 
  SigninPage,
  Container,
  EnterAppButton,
  FormContent,
  RememberLogin,
  InputCheckbox
} from '../styles/screens/signin';

import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Signin() {
  const inputRefs = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    alert('Login realizado com sucesso!');
  }, [inputRefs]);

  return (
    <SigninPage>
      <Container>
        <Background />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <BackButton
            path="/signup"
            arrowDirection={true}
          />

          <FormContent>
            <h2>Fazer Login</h2>
            
            <Input
              name="email"
              label="E-mail"
              type="email"
            />

            <Input
              name="password"
              label="Senha"
              type="password"
            />

            <RememberLogin>
              <InputCheckbox>
                <input 
                  type="checkbox"
                  name="remember"
                />
                <span>Lembrar-me</span>
              </InputCheckbox>
              <a href="#">Esqueci minha senha</a>
            </RememberLogin>

            <Button>Entrar</Button>
          </FormContent>
        </Form>
      </Container>
    </SigninPage>
  );
}