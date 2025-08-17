import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@user/user.entity';

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

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '5432'), 10),
  username: getEnv('DB_USERNAME', 'postgres'),
  password: getEnv('DB_PASSWORD', ''),
  database: getEnv('DB_NAME', 'NoteSphere'),
  entities: [User],
  synchronize: false, // Disable synchronize when using migrations
  logging: getEnv('NODE_ENV', 'development') === 'development',
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  ssl: getEnv('NODE_ENV', 'development') === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
