import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

class PendingOrphanagesController {
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(id);

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Orphanage does not exists!'
      });
    }

    await orphanageRepository.update(id, {
      isPending: false
    });

    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(id);

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Orphanage does not exists'
      });
    }
    
    await orphanageRepository.delete(id);

    return response.status(204).send();
  }
}

export default new PendingOrphanagesController();