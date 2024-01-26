// Import environment variables from .env, if applicable
require('dotenv').config();

// App settings
export const PROFILE: string = process.env.PROFILE || 'dev';
export const PORT: number = parseInt(process.env.PORT) || 3000;

// External connection settings
export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

// Security settings
export const JWT_SECRET: string = process.env.JWT_SECRET || 'java > python, change my mind';