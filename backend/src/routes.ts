import { Router } from 'express';
import multer from 'multer'

import OrphanageController from './app/controllers/OrphanageController';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);

export default routes