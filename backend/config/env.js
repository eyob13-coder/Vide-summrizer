import { config } from 'dotenv';

config({ path: `.env` }); // Always load base .env first
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); // Then override with env-specific

export const { PORT,
             NODE_ENV,
             DB_URI,
             JWT_SECRET,
             JWT_EXPIRES_IN,
             ARCJET_ENV,
             ARCJET_KEY
     } = process.env; 