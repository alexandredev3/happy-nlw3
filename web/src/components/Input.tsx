import React, { 
  useEffect, 
  useState,
  useCallback, 
  useRef, 
  InputHTMLAttributes 
} from 'react';
import { useField } from '@unform/core';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
  Container,
  Label,
  VisibleButton
} from '../styles/components/input';
import { type } from 'os';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFilled(false);
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    // quando coloco um "!", estou convertendo os valores para boolean.
    // com os dois "!" estou "invertendo" o "true" e o "false", faça um debug para conferir.
    // com essa "inverção" o "!!inputRef.current?.value" vai retornar "true" se tiver alguma coisa escrito.
    // ou "false" se não tiver nada escrito.
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleToggleVisiblePassword = useCallback(() => {
    setIsVisiblePassword(!isVisiblePassword);
  }, [isVisiblePassword]);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField]);

  return (
    <Container
      isFilled={isFilled}
      isFocus={isFocus}
    >
      <Label htmlFor={fieldName}>{ label }</Label>

      {rest.type === 'password' ? (
        <>
          <VisibleButton 
            onClick={handleToggleVisiblePassword}
            type="button"
          >
            {isVisiblePassword ? (
              <FiEye size={26} color="#8FA7B2" />
            ) : (
              <FiEyeOff size={26} color="#15C3D6" />
            )}
          </VisibleButton>

          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            type={isVisiblePassword ? 'text' : 'password'}
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
    </Container>
  );
}

export default Input;
