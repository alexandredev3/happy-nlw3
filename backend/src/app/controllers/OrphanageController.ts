import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import * as Yup from 'yup';
// estamos pegando tudo que esta dentro do yup e colocando dentro de Yup, porque la não tem o export default.

import Orphanage from '../models/Orphanage';
import orphanageView from '../../views/orphanages_view';

class OrphanageController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    // ele vai tentar encontrar se não vai retornar um erro.
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.renderOne(orphanage));
  }

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    // se quiser fazer algum tipo de condição, coloque dentro do find.
    const orphanages = await orphanagesRepository.find({
      relations: ['images'] // ultilizamos isso quando queremos retorna uma tabela relacionada.
    });

    return response.json(orphanageView.renderMany(orphanages));
  }

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
  
    // estou forçando a tipagem do request.files, falando que ele e uma array de arquivos.
    // apenas um "hackizinho" quando for trabalhar com multiplos arquivos.
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape(
          {
            path: Yup.string().required()
          }
        )
      )
    });

    await schema.validate(data, {
      abortEarly: false // esta opção vai fazer o yup mostrar todos os erros de validação.
    });

    // aqui ele deixa o orfanato pre criado, ele não cria no banco de dados direto.
    const orphanage = orphanagesRepository.create(data);
  
    // aqui ele vai salvar no banco de dados
    // passa o orfanato que criamos como parametro do metodo save.
    await orphanagesRepository.save(orphanage);
  
    // status code 201 e quando alguma coisa foi criada.
    return response.status(201).json(orphanage);
  }
}

export default new OrphanageController();