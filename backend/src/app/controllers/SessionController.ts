import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import jwt from '../../utils/jwt';

import User from '../models/User';

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    await schema.validate({ email, password }, {
      abortEarly: false
    })

    const user = await userRepository.findOne({
      where: { email: email }
    });

    if (!user) {
      return response.status(400).json({
        status: 400,
        error: 'User does not exists.'
      });
    }

    if (!await (user).comparePassword(password)) {
      return response.status(401).json({
        error: 'Password does not match'
      });
    }

    const { 
      name, 
      id, 
    } = user;

    return response.status(200).json({
      user: {
        id,
        name,
      },
      token: jwt.sign({ id: user.id })
    })
  }
}

export default new SessionController();