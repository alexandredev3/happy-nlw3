import 'express-async-errors';
import express from 'express';
import { join } from 'path';
import cors from 'cors';
import 'dotenv/config'
import BullBoard from 'bull-board';

import Queue from './lib/Queue';

// precisamos chamar o arquivo connection aqui no nosso app.
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handle';

const app = express();

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(cors());
app.use(express.json());
app.use('/admin/queues', BullBoard.UI); 
app.use(routes);
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(errorHandler);

export { app };