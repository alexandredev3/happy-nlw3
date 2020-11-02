import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { 
      name,
      email,
      password,
      confirm_password 
    } = request.body;

    const userRepository = getRepository(User)

    const userExists = await userRepository.findOne({
      where: { email: email }
    });

    if (userExists) {
      return response.status(400).json({
        error: 'User already exists'
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        error: 'Password does not match'
      })
    }

    const data = {
      name,
      email,
      password_hash: password,
    }

    const schema = Yup.object().shape({
      name: Yup.string().max(50).required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().min(8).required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(204).send();
  }
}

export default new UserController();