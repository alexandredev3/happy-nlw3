import { 
  TYPEORM_TYPE,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_PASSWORD,
  TYPEORM_USERNAME,
  MONGO_TYPE,
  MONGO_URL
} from './src/utils/environment';
import { join } from 'path';

module.exports = [
  {
    name: 'default',
    type: TYPEORM_TYPE,
    host: TYPEORM_HOST,
    port: TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    ssl: {
      rejectUnauthorized: false
    },
    migrations: [
      "./src/database/migrations/*.ts",
    ],
    factories: ['./src/factories/*.ts'],
    entities: [join(__dirname, 'src', 'app', 'models', '*.ts')],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
  },
  {
    name: 'mongodb',
    type: MONGO_TYPE,
    url: MONGO_URL,
    useUnifiedTopology: true,
    logging: true,
    entities: [join(__dirname, 'src', 'app', 'schemas', '*.ts')],
  },
]
