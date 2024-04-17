import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDb = async (d1: D1Database) => {
  return await drizzle(d1, { schema });
};

export type DrizzleClient = Awaited<ReturnType<typeof createDb>>;

const DbClient = {
  _instance: null as DrizzleClient | null,
  get instance(): DrizzleClient {
    if (!this._instance) {
      throw new Error('Database client instance not initialized.');
    }
    return this._instance;
  },
  async init(d1Db: D1Database): Promise<void> {
    if (d1Db) {
      this._instance = await createDb(d1Db);
    }
  },
};

export { DbClient };

export interface Env {
  DB: D1Database;
}
