import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import imageView from '../../views/images_view';

import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

class FileController {
  async index(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const imageRepository = getRepository(Image);

    const images = await imageRepository.find({
      where: { orphanage_id: orphanage_id },
    });

    if (!images) {
      return response.status(400).json({
        error: 'Image does not exists'
      });
    }

    return response.status(200).json(imageView.renderMany(images as []));
  }

  async create(request: Request, response: Response) {
    const { orphanage_id } = request.params;

    const fileRequest = request.files as Express.Multer.File[];

    const imageRepository = getRepository(Image);
    const orphanageRepository = getRepository(Orphanage);

    const orphanageExists = await orphanageRepository.findOne(orphanage_id);

    if (!orphanage_id) {
      return response.status(400).json({
        error: 'id required'
      });
    }

    if (!orphanageExists) {
      return response.status(400).json({
        error: 'Image does not exists'
      });
    }

    const images = fileRequest.map(image => {
      return imageRepository.create({
        path: image.filename,
        orphanage_id: Number(orphanage_id)
      })
    });

    await imageRepository.save(images);

    return response.status(200).json(images);
  }

  async destroy(request: Request, response: Response) {
    const { image_id } = request.params;

    const imageRepository = getRepository(Image);

    const imageExists = await imageRepository.findOne(image_id);

    if (!image_id) {
      return response.status(400).json({
        error: 'id required'
      });
    }

    if (!imageExists) {
      return response.status(400).json({
        error: 'Image does not exists'
      });
    }

    await imageRepository.delete(image_id);

    return response.status(204).send()
  }
}

export default new FileController();