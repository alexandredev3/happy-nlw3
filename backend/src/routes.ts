import { Router } from 'express';
import multer from 'multer'

import OrphanageController from './app/controllers/OrphanageController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

routes.use(authMiddleware);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);

export default routes