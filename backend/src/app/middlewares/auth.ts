import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

interface Decoded {
  uid: number;
  iat: number; 
  exp: number;
}

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: 'Token is required'
    });
  }
  
  const [, token] = authHeader.split(' ');


  try {
    const decoded = jwt.verify(token, authConfig.secret) as Decoded

    request.userId = decoded.uid

    return next();
  } catch(err) {
    return response.status(401).json({
      error: 'token is invalid'
    })
  }
}