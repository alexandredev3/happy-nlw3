import 'express-async-errors';
import express from 'express';
import { join } from 'path';
import cors from 'cors';
import 'dotenv/config';

// precisamos chamar o arquivo connection aqui no nosso app.
import './database';

import routes from './routes';
import errorHandler from './errors/handle';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);

export { app };