import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({
      where: { email: email }
    });

    if (!await (user).comparePassword(password)) {
      return response.status(401).json({
        error: 'Password does not match'
      });
    }

    const { name, id } = user;

    return response.status(200).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ uid: id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController();