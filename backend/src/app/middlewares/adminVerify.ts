import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default async (request: Request, response: Response, next: NextFunction) => {
  const userRepository = getRepository(User);

  const userIsAdmin = await userRepository.findOne({
    where: {
      id: request.userId,
      isAdmin: true
    }
  })

  if (!userIsAdmin) {
    return response.status(401).json({ 
      error: 'Only administrators can accept an orphanage!' 
    });
  }

  return next();
}