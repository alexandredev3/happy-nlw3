import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

class PendingOrphanagesController {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanagesPending = await orphanageRepository.find({
      where: { isPending: true }
    });

    return response.status(200).json(orphanagesPending);
  }

  async update(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(orphanage_id);

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Orphanage does not exists!'
      });
    }

    await orphanageRepository.update(orphanage_id, {
      isPending: false
    });

    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(id, {
      where: { isPending: true }
    });

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Orphanage does not exists or orphanage has already been accepted'
      });
    }
    
    await orphanageRepository.delete(id);

    return response.status(204).send();
  }
}

export default new PendingOrphanagesController();