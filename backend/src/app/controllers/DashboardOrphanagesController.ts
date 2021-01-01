import { Request, Response } from 'express';
import { getRepository, getMongoRepository } from 'typeorm';

import orphanage_view from '../../views/orphanages_view';

import Orphanage from '../models/Orphanage';
import Notification from '../schemas/Notification';

class DashboardOrphanagesController {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanagesPending = await orphanageRepository.find({
      where: { isPending: true },
      relations: ['images']
    });

    return response.status(200).json(
      orphanage_view.renderMany(orphanagesPending)
    );
  }

  async update(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const notificationRepository = getMongoRepository(Notification, "mongodb")
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne(orphanage_id, {
      relations: ['users']
    });

    if (!orphanage) {
      return response.status(400).json({
        error: 'Orphanage does not exists!'
      });
    }

    await orphanageRepository.update(orphanage_id, {
      isPending: false
    });

    const { name, users } = orphanage;

    const notification = notificationRepository.create({
      user_id: users.id,
      title: 'O orfanato que você cadastrou foi aceito!',
      content: `Ebaaa!! O orfanato ${name} 
      foi aceito! Agora outras pessoas podem ver e entrar
      em contado com o orfanato que você cadastrou.`
    });

    await notificationRepository.save(notification);

    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const notificationRepository = getMongoRepository(Notification, "mongodb");
    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne(orphanage_id, {
      relations: ['users']
    });

    if (!orphanage) {
      return response.status(400).json({
        error: 'Orphanage does not exists.'
      });
    }

    const { name, users } = orphanage;

    const notification = notificationRepository.create({
      user_id: users.id,
      title: "Infelizmente o orfanato que você cadastrou NÃO foi aceito.",
      content: `O orfanato ${name} não será visto por ninguém, se você achar que isso é um erro, entre em contato pelo E-mail <alo@happy.com.br>.`
    });

    // await orphanageRepository.delete(orphanage_id);

    await notificationRepository.save(notification);

    return response.status(204).send();
  }
}

export default new DashboardOrphanagesController();