import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDb = async (d1: D1Database) => {
  return await drizzle(d1, { schema });
};

export type DrizzleClient = Awaited<ReturnType<typeof createDb>>;

class DbClient {
  private static _instance: DrizzleClient | null = null;

  private constructor() {}

  public static get instance(): DrizzleClient {
    if (!DbClient._instance) {
      throw new Error('Database client instance not initialized.');
    }
    return DbClient._instance;
  }

  public static async init(d1Db: D1Database): Promise<void> {
    if (d1Db) {
      this._instance = await createDb(d1Db);
    }
  }
}

export { DbClient };

export interface Env {
  DB: D1Database;
}
