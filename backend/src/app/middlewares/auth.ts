import { Request, Response, NextFunction } from 'express';

import jwt from '../../utils/jwt';

export default async (request: Request, response: Response, next: NextFunction) => {
  const token = jwt.extractToken(request); 

  jwt.verify(token)
    .then(({ id }) => {
      request.user = id;

      next();
    })
    .catch((error) => {
      response.status(401).json({
        status: 401,
        message: 'Invalid authentication token',
        code: 'UNAUTHENTICATED',
      })
    })
}