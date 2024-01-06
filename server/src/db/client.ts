import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDb = async(d1: D1Database) => {
  return await drizzle(d1, { schema });
};

export interface Env {
  DB: D1Database;
}
