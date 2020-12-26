import * as Yup from 'yup';

interface IValidationError {
  [key: string]: string;
};

const setValidationErrors = (error: any) => {
  const validationErrors: IValidationError = {};

  error.inner.forEach((error: Yup.ValidationError) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export default setValidationErrors;