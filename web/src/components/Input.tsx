import React, { useEffect, useState, useCallback, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import {
  Container,
  Label
} from '../styles/components/input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFilled(false);
    setIsFocus(true);
  }, []);

  console.log(!inputRef.current?.value);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    // quando coloco um "!", estou convertendo os valores para boolean.
    // com os dois "!" estou "invertendo" o "true" e o "false", faça um debug para conferir.
    // com essa "inverção" o "!!inputRef.current?.value" vai retornar "true" se tiver alguma coisa escrito.
    // ou "false" se não tiver nada escrito.
    setIsFilled(!!inputRef.current?.value);
  }, []);

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

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

export default Input;
