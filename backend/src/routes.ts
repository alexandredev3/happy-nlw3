import { Router } from 'express';
import multer from 'multer'

import OrphanageController from './app/controllers/OrphanageController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PendingOrphanagesController from './app/controllers/PendingOrphanagesController';
import FileController from './app/controllers/FileController';
import ResetPasswordController from './app/controllers/ResetPasswordController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';
import adminVerify from './app/middlewares/adminVerify';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

routes.post('/password/forgot', ResetPasswordController.create);
routes.put('/password/reset/:token', ResetPasswordController.update);

// Operations that only authenticated users can do;
routes.use(authMiddleware);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:orphanage_id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);

// Operations that only administrators can do;
routes.use(adminVerify);

routes.get('/pending', PendingOrphanagesController.index);
routes.put('/orphanages/accept/:orphanage_id', PendingOrphanagesController.update);
routes.delete('/orphanages/refuse/:orphanage_id', PendingOrphanagesController.destroy);

routes.put('/orphanages/:orphanage_id', OrphanageController.update);

routes.get('/orphanages/images/:orphanage_id', FileController.index);
routes.post('/orphanages/images/:orphanage_id', upload.array('images'), FileController.create);
routes.delete('/orphanages/images/:image_id', FileController.destroy);

export default routes;