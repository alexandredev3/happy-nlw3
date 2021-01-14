import * as Yup from 'yup';
import { scroller } from 'react-scroll';

interface IValidationError {
  [key: string]: string;
};

export async function orphanageFormValidation (validationData: any) {
  function fileSizeValidation(files: File[]) {
    let isValid = true;

    if (files) {
      files.map((file) => {
        const limitSize = 4 * 1024 * 1024;

        if (file.size > limitSize) {
          return isValid = false;
        }
      })
    }

    return isValid;
  }

  function fileTypeValidation(files: File[]) {
    let isValid = true;

    if (files) {
      files.map((file) => {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

        if (!validTypes.includes(file.type)) {
          isValid = false;
        }
      })
    }

    return isValid;
  }

  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required('Nome é obrigatório'),
    whatsapp: Yup
      .string()
      .required('Whatsapp é obrigatório'),
    about: Yup
      .string()
      .required('Sobre é obrigatório'),
    instructions: Yup
      .string()
      .required('Instruções é obrigatório'),
    opening_hours: Yup
      .string()
      .required('Horário de funcionamento é obrigatório'),
    files: Yup
      .array()
      .test(
        'maximum size reached.',
        'Tamanho máximo é de 4MB.',
        (value) => fileSizeValidation(value as File[])
      )
      .test(
        'Invalid Type',
        'Tipo da imagem é invalida.',
        (value) => fileTypeValidation(value as File[])
      )
      .required('Deve ter pelo menos 1 imagem.'),
    latitude: Yup
      .number()
      .required()
      .test(
        'no location selected',
        'latitude must not be 0',
        (value) => {
          return value != 0;
        }
      ),
    longitude: Yup
      .number()
      .required()
      .test(
        'no location selected',
        'longitude must not be 0',
        (value) => {
          return value != 0;
        }
      ),
  });

  await schema.validate(validationData, {
    abortEarly: false
  });
}

export function getValidationErrors(error: Yup.ValidationError) {
  const validationErrors: IValidationError = {};
  let markerError = false

  error.inner.forEach((error) => {
    validationErrors[error.path] = error.message;

    if (error.type === 'no location selected') {
      scroller.scrollTo('ScrollToMap', {
        duration: 800,
        smooth: true
      });

      markerError = true;
    }
  });

  return {
    validationErrors,
    markerError
  };
}