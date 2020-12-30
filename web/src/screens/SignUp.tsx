import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import getValidationErrors from '../utils/getValidationErrors';

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
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = useCallback(async (data: ISignUpData) => {
    const { name, email, password, confirmPassword } = data;

    try {
      inputRefs.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup
          .string()
          .required('Nome é obrigatório.'),
        email: Yup
          .string()
          .email('Preencha com um E-mail valido.')
          .required('E-mail é obrigatório'),
        password: Yup
          .string()
          .min(8, 'A senha tem que ter no mínimo 8 caracteres.')
          .required('Senha é obrigatório.')
          .test(
            'match', 'Essas senhas não coincidem.', function (value) {
              const { confirmPassword } = this.parent;

              return value === confirmPassword;
            }
          ),
        confirmPassword: Yup
          .string()
          .required('Confirme sua senha.')
          .test(
            'match', 'Essas senhas não coincidem.', function (value) {
              const { password } = this.parent;
            
              return value === password;
            }
          )
      });

      await schema.validate(data, {
        abortEarly: false
      });

      setInProgress(true);

      await api.post('/users', {
        name,
        email,
        password,
        confirm_password: confirmPassword
      }, {
        onDownloadProgress: () => {
          setInProgress(false);
        }
      });

      alert('cadastro realizado com sucesso!');

      push('/signin');
    } catch(error) {

      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);

        return inputRefs.current?.setErrors(validationErrors);
      }

      alert(error)
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
              type="text"
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

            <Button type="submit" isLoading={inProgress}>Entrar</Button>
          </FormContent>
        </Form>
      </Container>
    </SignUpPage>
  );
}