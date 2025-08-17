import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Type-safe environment variable access
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '5432'), 10),
  username: getEnv('DB_USERNAME', 'postgres'), // Default username, update in .env if different
  password: getEnv('DB_PASSWORD', ''), // Add your PostgreSQL password in .env
  database: 'NoteSphere', // Using the exact case-sensitive database name
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: getEnv('NODE_ENV', 'development') !== 'production',
  logging: getEnv('NODE_ENV', 'development') === 'development',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  ssl: getEnv('NODE_ENV', 'development') === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
};

// For TypeORM CLI
export default databaseConfig;
