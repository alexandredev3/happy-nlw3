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

interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  multiline?: T;
}

// estou indicando para o elemento input, que ele recebe essa interface Props, o msm para o textarea.
type InputProps = JSX.IntrinsicElements['input'] & Props<false>;
type TextAreaProps = JSX.IntrinsicElements['textarea'] & Props<true>

const Input: React.FC<InputProps | TextAreaProps> = ({ 
  name, 
  label, 
  multiline = false,
  ...rest 
}) => {
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
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  const inputProps = {
    ...rest,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    ref: inputRef,
    name: fieldName,
    id: fieldName,
    'arial-label': fieldName,
    defaultValue
  }

  if (rest.type === 'password') {
    return (
      <Container
        isFilled={isFilled}
        isFocus={isFocus}
      >
        <Label htmlFor={fieldName}>{ label }</Label>

        <VisibleButton 
          onClick={handleToggleVisiblePassword}
          type="button"
        >
          {isVisiblePassword ? (
            <FiEyeOff size={26} color="#15C3D6" />
          ) : (
            <FiEye size={26} color="#8FA7B2" />
          )}
        </VisibleButton>

        <input
          {...inputProps as unknown as InputProps}
          type={isVisiblePassword ? 'text' : 'password'}
        />
      </Container>
    );
  }

  return (
    <Container
      isFilled={isFilled}
      isFocus={isFocus}
      isMultiline={multiline}
    >
      <Label htmlFor={fieldName}>{ label }</Label>

      {multiline ? (
        <textarea
          {...inputProps as unknown as TextAreaProps}
        />
      ) : (
        <input
          {...inputProps as unknown as InputProps}
        />
      )}
    </Container>
  );
}

export default Input;
