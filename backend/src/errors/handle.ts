import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
// ErrorRequestHandler: e uma tipagem para qualquer errorHandler.

interface ValidationErrors {
  [key: string]: string[]; // a chave e uma string e o valor e uma array de string
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  /**
   * error: são os erros;
   * request: são os dados da minha requisição;
   * response: e a resposta que vc quer devolver;
   */

  // estou verificando se o error e uma instacia da classe ValidationError.
  // Os erros de validação vai ser retornado para quem estiver consumindo minha API.
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    // error.inner e onde os erros de validação vão estar.
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
      /**
       * O retorno vai ser dessa forma:
          {
            "message": "Validate fails",
            "errors": {
              "name": [
                "name is a required field"
              ],
              "longitude": [
                "longitude is a required field"
              ]
            }
          }
       */
    });

    return response.status(400).json({ message: 'Validate fails', errors })
  }

   console.error(error);
   // esse console retornando o erro, so vai aparece para nos.

   // eu vou devolver essa resposta para quem estiver consumindo minha api;
   return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;