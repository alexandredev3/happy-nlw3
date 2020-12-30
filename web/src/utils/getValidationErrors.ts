import * as Yup from 'yup';

interface IValidationError {
  [key: string]: string;
};

const getValidationErrors = (error: Yup.ValidationError) => {
  const validationErrors: IValidationError = {};

  error.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export default getValidationErrors;