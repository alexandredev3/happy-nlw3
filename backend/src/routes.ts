import { Router } from 'express';
import multer from 'multer'

import OrphanageController from './app/controllers/OrphanageController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AcceptOrphanagesController from './app/controllers/AcceptOrphanagesController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';
import adminVerify from './app/middlewares/adminVerify';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

// Operations that only authenticated users can do;
routes.use(authMiddleware);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);

// Operations that only administrators can do;
routes.use(adminVerify);

routes.put('/orphanages/accept/:id', AcceptOrphanagesController.update);
routes.delete('/orphanages/refuse/:id', AcceptOrphanagesController.destroy);

export default routes