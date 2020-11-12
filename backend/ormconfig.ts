import { 
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE
} from './src/utils/environment'

module.exports = {
  type: TYPEORM_TYPE,
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/app/models/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
