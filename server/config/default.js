import { config } from 'dotenv';

config();

export const SECRET_KEYS = {
  khalti: process.env.KHALTI_LIVE_SECRET_KEY,
};
