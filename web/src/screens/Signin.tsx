import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext';
import * as Yup from 'yup';

import setValidationErrors from '../utils/validationErrors';

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

interface ISigninData {
  email: string;
  password: string;
}

export default function Signin() {
  const [isSaveToken, setIsSaveToken] = useState(false);


  const inputRefs = useRef<FormHandles>(null);

  const { signIn, inProgress } = useAuth();

  const handleCheckBox = useCallback(() => {
    setIsSaveToken(!isSaveToken);
  }, [isSaveToken])

  const handleSubmit = useCallback(async (data: ISigninData) => {
    const { email, password } = data;

    try {
      inputRefs.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup
          .string()
          .email('Preencha com um E-mail valido')
          .required('E-mail é obrigatório'),
        password: Yup
          .string()
          .required('Senha é obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await signIn({
        email,
        password,
        isSaveToken
      })

    } catch(error) {
 
      if (error instanceof Yup.ValidationError) {
        const validationErrors = setValidationErrors(error);

        return inputRefs.current?.setErrors(validationErrors);
      }

      alert(error)
    }
  }, [inputRefs, isSaveToken]);

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
              type="text"
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
                  onChange={handleCheckBox}
                />
                <span>Lembrar-me</span>
              </InputCheckbox>
              <Link to="/signin/password/forgot">Esqueci minha senha</Link>
            </RememberLogin>

            <Button 
              className="signin__button"
              type="submit"
              isLoading={inProgress}
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