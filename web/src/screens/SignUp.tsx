import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { 
  SignUpPage,
  Container,
  FormContent
} from '../styles/screens/sign-up';

import api from '../services/api';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { push } = useHistory();

  const inputRefs = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ISignUpData) => {
    const { name, email, password, confirmPassword } = data;

    try {
      await api.post('/users', {
        name,
        email,
        password,
        confirm_password: confirmPassword
      });

      alert('cadastro realizado com sucesso!');

      push('/signin');
    } catch(err) {
      alert('Ocorreu um erro inesperado.')
    }
  }, [inputRefs])

  return (
    <SignUpPage>
      <Container>
        <Background />

        <Form ref={inputRefs} onSubmit={handleSubmit}>
          <BackButton
            className="back__button"
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
              name="confirmPassword"
              type="password"
            />

            <Button type="submit">Entrar</Button>
          </FormContent>
        </Form>
      </Container>
    </SignUpPage>
  );
}