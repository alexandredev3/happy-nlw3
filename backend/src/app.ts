import express from 'express';
import routes from './routes';

// precisamos chamar o arquivo connection aqui no nosso app.
import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);

export { app };