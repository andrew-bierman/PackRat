import { drizzle } from 'drizzle-orm/d1';
import {UserTable} from './schema'

export const createDb = (d1: D1Database) => {
  return drizzle(d1);
};
