import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import userView from '../../views/user_view';

import User from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, confirm_password } = request.body;

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

    const user = userRepository.create({
      name,
      email,
      password_hash: password
    });

    await userRepository.save(user);

    return response.status(204).send();
  }
}

export default new UserController();