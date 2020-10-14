import express from 'express';
import 'express-async-errors';
import { join } from 'path';
import cors from 'cors';

// precisamos chamar o arquivo connection aqui no nosso app.
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handle';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(errorHandler)

export { app };