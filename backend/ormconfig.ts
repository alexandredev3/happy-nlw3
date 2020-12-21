import { 
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE
} from './src/utils/environment';

module.exports = {
  type: TYPEORM_TYPE,
  database: './src/database/database.sqlite',
  migrations: [
    "./src/database/migrations/*.ts",
  ],
  seeds: ['./src/database/seeds/*.ts'],
  factories: ['./src/factories/*.ts'],
  entities: ["./src/app/models/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
