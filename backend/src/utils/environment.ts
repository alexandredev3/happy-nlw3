import dotenv from 'dotenv';

dotenv.config();

dotenv.config({
  path: '../../.env'
});

// Secrets;
export const { 
  PUBLIC_SECRET,
  PRIVATE_SECRET
} = process.env;

// Postgres Connection;
export const { 
  TYPEORM_TYPE,
  TYPEORM_URL,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;

// Mongo Connection;
export const {
  MONGO_TYPE,
  MONGO_URL
} = process.env;

// Redis Connection;
export const { 
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

// Service Mail Connection;
export const { 
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
} = process.env;

// admin credentials
export const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD
} = process.env;

// App;
export const { 
  APP_URL,
} = process.env;