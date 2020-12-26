import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default async (request: Request, response: Response, next: NextFunction) => {
  const adminUsersRepository = getRepository(User);
  
  const id = request.userId;

  const userIsAdmin = await adminUsersRepository.findOne({
    where: {
      id,
      isAdmin: true
    }
  })

  if (!userIsAdmin) {
    return response.status(401).json({
      status: 401,
      error: 'Restricted Access',
    });
  }

  return next();
}