import { Router } from 'express';
import multer from 'multer'

import OrphanageController from './app/controllers/OrphanageController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import DashboardOrphanagesController from './app/controllers/DashboardOrphanagesController';
import FileController from './app/controllers/FileController';
import ResetPasswordController from './app/controllers/ResetPasswordController';
import NotificationController from './app/controllers/NotifiactionController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/isAdmin';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

routes.post('/password/forgot', ResetPasswordController.create);
routes.put('/password/reset/:token', ResetPasswordController.update);

// Operations that only authenticated users can do;
routes.use(authMiddleware);

routes.get('/user/info', UserController.show);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:orphanage_id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:notification_id', NotificationController.update);
routes.delete('/notifications/:notification_id', NotificationController.destroy);

// Operations that only administrators can do;
routes.use(isAdmin);

routes.get('/dashboard/orphanages', DashboardOrphanagesController.index);
routes.put('/dashboard/orphanages/accept/:orphanage_id', DashboardOrphanagesController.update);
routes.delete('/dashboard/orphanages/refuse/:orphanage_id', DashboardOrphanagesController.destroy);

routes.put('/orphanages/:orphanage_id', upload.array('images'), OrphanageController.update);
routes.delete('/orphanages/:orphanage_id', OrphanageController.destroy);

routes.delete('/orphanages/images/:image_id', FileController.destroy);

export default routes;