import { Router } from 'express';

const routes = Router();

import OrphanageController from './app/controllers/OrphanageController';

routes.post('/orphanages', OrphanageController.create);

export default routes