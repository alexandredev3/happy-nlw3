import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import userView from '../../views/user_view';

import User from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User)

    const userExists = await userRepository.findOne({
      where: { email: email }
    });

    if (userExists) {
      return response.status(400).json({
        error: 'User already exists'
      })
    }

    const user = userRepository.create({
      name,
      email,
      password_hash: password
    });

    await userRepository.save(user);

    return response.status(201).json(userView.render(user));
  }
}

export default new UserController();