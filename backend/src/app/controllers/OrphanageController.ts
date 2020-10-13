import { Request, Response } from 'express';
import { getRepository } from 'typeorm'

import Orphanage from '../models/Orphanage';

class OrphanageController {
  async create(request: Request, response: Response) {
    const { 
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    // colocamos o nosso model como parametro no getRepository, agora temos todos os metodos no orphanagesRepository
    const orphanagesRepository = getRepository(Orphanage);
  
    // aqui ele deixa o orfanato pre criado, ele não cria no banco de dados direto.
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    });
  
    // aqui ele vai salvar no banco de dados
    // passa o orfanato que criamos como parametro do metodo save.
    await orphanagesRepository.save(orphanage);
  
    // status code 201 e quando alguma coisa foi criada.
    return response.status(201).json(orphanage);
  }
}

export default new OrphanageController();