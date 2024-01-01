import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};

export interface Env {
  production: D1Database;
}
