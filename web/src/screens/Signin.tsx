import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom'

import { 
  SigninPage,
  Container,
  FormContent,
  RememberLogin,
  InputCheckbox
} from '../styles/screens/signin';

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
              <Link to="/password/forgot">Esqueci minha senha</Link>
            </RememberLogin>

            <Button 
              className="signin__button"
              type="submit"
            >
              Entrar
            </Button>
            <Link 
              className="create__button"
              to="/signup"
            >
              Criar uma nova conta
            </Link>
          </FormContent>
        </Form>
      </Container>
    </SigninPage>
  );
}