// Import environment variables from .env, if applicable
require('dotenv').config();

// App settings
export const PROFILE: string = process.env.PROFILE || 'dev';
export const PORT: number = parseInt(process.env.PORT) || 3000;

// External connection settings
export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

// Security settings
export const NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET || 'SoupOrSecret';

// Auth providers
export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || 'temporary google client id';
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || 'temporary google client secret';
export const GOOGLE_REDIRECT_URL: string = process.env.GOOGLE_REDIRECT_URL || 'http://localhost:3000/auth/google/callback';


