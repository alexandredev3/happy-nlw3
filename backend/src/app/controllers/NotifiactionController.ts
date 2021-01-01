import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';

class NotificationController {
  async index(request: Request, response: Response) {
    const user_id = request.userId;

    const notificationRepository = getMongoRepository(Notification, "mongodb");

    const notifications = await notificationRepository.find({
      where: {
        user_id
      }
    });

    return response.status(200).json(notifications);
  }
  async update(request: Request, response: Response) {
    const { notification_id } = request.params;

    const notificationRepository = getMongoRepository(Notification, "mongodb");

    const notification = await notificationRepository.findOne(notification_id);

    if (!notification) {
      return response.status(400).json({
        error: "Notification not found."
      })
    }

    await notificationRepository.update(notification_id, {
      read: true
    });

    return response.status(204).send();
  }
  async destroy(request: Request, response: Response) {
    const { notification_id } = request.params;

    const notificationRepository = getMongoRepository(Notification, "mongodb");

    const notification = await notificationRepository.findOne(notification_id);

    if (!notification) {
      return response.status(400).json({
        error: "Notification does not exists"
      })
    }

    await notificationRepository.delete(notification_id);

    return response.status(204).send();
  }
}

export default new NotificationController();