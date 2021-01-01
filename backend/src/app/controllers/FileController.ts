import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Image from '../models/Image';

class FileController {
  async destroy(request: Request, response: Response) {
    const { image_id } = request.params;

    const imageRepository = getRepository(Image);

    const imageExists = await imageRepository.findOne(image_id);

    if (!image_id) {
      return response.status(400).json({
        error: 'Id is required.'
      });
    }

    if (!imageExists) {
      return response.status(400).json({
        error: 'Image does not exists.'
      });
    }

    await imageRepository.delete(image_id);

    return response.status(204).send()
  }
}

export default new FileController();