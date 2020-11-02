import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import crypto from 'crypto';
import { isBefore } from 'date-fns';

import User from '../models/User';
import ResetPassword from '../models/ResetPassword';

class ResetPasswordController {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    const userRespository = getRepository(User);
    const resetPasswordRepository = getRepository(ResetPassword);

    const user = await userRespository.find({
      where: { email: email }
    });

    if (!user) {
      return response.status(400).json({
        error: 'User does not exists'
      });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const expiresOn = new Date();
    expiresOn.setMinutes(expiresOn.getMinutes() + 30);

    const resetPassword = resetPasswordRepository.create({
      token,
      expires_on: expiresOn,
      user_id: user[0].id
    });

    await resetPasswordRepository.delete({
      user_id: user[0].id
    });
    await resetPasswordRepository.save(resetPassword);

    return response.status(204).send();
  }

  async update(request: Request, response: Response) {
    const { token } = request.params;
    const { password, confirm_password } = request.body;

    const userRespository = getRepository(User);
    const resetPasswordRepository = getRepository(ResetPassword);

    if (!token) {
      return response.status(400).json({
        error: 'Token is required'
      });
    }

    const tokenIsValid = await resetPasswordRepository.findOne({
      where: { 
        token: token, was_used: false 
      }
    });

    if (!tokenIsValid) {
      return response.status(401).json({
        error: 'Token is invalid or has already been used'
      });
    }

    const dateNow = new Date();

    if (!isBefore(dateNow, tokenIsValid.expires_on)) {
      return response.status(401).json({
        error: 'Token is expired'
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        error: 'Password does not match'
      })
    }

    await resetPasswordRepository.createQueryBuilder()
      .update(ResetPassword)
      .set({ was_used: true })
      .where('token = :token', { token })
      .execute();

    /**
     * Quando nós usamos o método "update", a senha e salvo diretamente na base de dados, a senha não passa pelo model.
     * Para nossa senha entrar no método "BeforeUpdate", nós precisamos colocar a senha direto no medel.
     * Porque o "BeforeUpdate" só será executado quando algum dado for alterado no model.
     */
    const user = new User;

    user.password_hash = password;

    await userRespository.update(tokenIsValid.user_id, user); 
    // TypeORM vai executar o método encryptPassword.

    return response.status(204).send();
  }
}

export default new ResetPasswordController();