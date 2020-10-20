module.exports = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/app/models/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
