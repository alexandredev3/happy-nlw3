import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';

import config from '../config/auth';

interface IDecoded {
  id: string;
}

const { private_secret, public_secret, expiresIn } = config;

const signOptions: SignOptions = {
  expiresIn,
  algorithm: 'RS256'
}

export default {
  extractToken: (request: Request, _?: Response) => {
    const authHeader = request.headers.authorization || '';
  
    const token = authHeader.replace('Bearer ', '');
  
    return token;
  },
  
  verify: (token: string): Promise<IDecoded> => new Promise((resolve, reject) => {
    const data = jwt.verify(token, public_secret, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      
      return decoded;
    })

    return resolve(data as unknown as IDecoded);
  }),

  sign: (payload: any) => {
    const token = jwt.sign(payload, private_secret, signOptions);

    return token;
  }
}