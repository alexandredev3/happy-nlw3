import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import * as Yup from 'yup';
// estamos pegando tudo que esta dentro do yup e colocando dentro de Yup, porque la não tem o export default.

import Orphanage from '../models/Orphanage';

import orphanageView from '../../views/orphanages_view';

interface FinalData {
  name: string;
  whatsapp: number;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    path: string;
  }>
}

class OrphanageController {
  async show(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    // ele vai tentar encontrar se não vai retornar um erro.
    const orphanage = await orphanagesRepository.findOneOrFail(orphanage_id, {
      relations: ['images']
    });

    return response.json(orphanageView.renderOne(orphanage));
  }

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    // se quiser fazer algum tipo de condição, coloque dentro do find.
    const orphanages = await orphanagesRepository.find({
      relations: ['images', 'users'] // ultilizamos isso quando queremos retorna uma tabela relacionada.
    });
    
    return response.json(orphanageView.renderMany(orphanages));
  }

  async create(request: Request, response: Response) {
    const { 
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    // colocamos o nosso model como parametro no getRepository, agora temos todos os metodos no orphanagesRepository
    const orphanageRepository = getRepository(Orphanage);
  
    // estou forçando a tipagem do request.files, falando que ele e uma array de arquivos.
    // apenas um "hackizinho" quando for trabalhar com multiplos arquivos.
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    })

    const data = {
      name,
      user_id: request.userId,
      whatsapp,
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
      whatsapp: Yup.number().required(),
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

    // esse cast converte o campo para o tipo que você colocou no yup.
    const finalData = schema.cast(data) as FinalData

    await schema.validate(data, {
      abortEarly: false // esta opção vai fazer o yup mostrar todos os erros de validação.
    });

    // aqui ele deixa o orfanato pre criado, ele não cria no banco de dados direto.
    const orphanage = orphanageRepository.create(finalData);

    // aqui ele vai salvar no banco de dados
    // passa o orfanato que criamos como parametro do metodo save.
    await orphanageRepository.save(orphanage);

    // status code 201 e quando alguma coisa foi criada.
    return response.status(201).json(orphanage);
  }

  async update(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const { 
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(orphanage_id);

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Orphanage does not exists'
      });
    }

    const data = {
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      whatsapp: Yup.number().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required()
    });

    await schema.validate(data, {
      abortEarly: false
    })

    await orphanageRepository.update(orphanage_id, data);

    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = orphanageRepository.findOne(orphanage_id, {
      where: { isPending: false }
    });

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'This orphanage was not registered in the database'
      });
    }

    await orphanageRepository.delete(orphanage_id);

    return response.status(204).send();
  }
}

export default new OrphanageController();