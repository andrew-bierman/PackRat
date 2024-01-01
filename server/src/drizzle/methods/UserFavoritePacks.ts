import { eq, and } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { userFavoritePacks } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class UserFavoritePacks {
  private dbInstance;

  constructor() {
    this.dbInstance = createDb(getDB());
  }

  async create(userId: string, packId: string) {
    return this.dbInstance
      .insert(userFavoritePacks)
      .values({ userId, packId })
      .returning();
  }

  async delete(userId: string, packId: string) {
    return this.dbInstance
      .delete(userFavoritePacks)
      .where(
        and(
          eq(userFavoritePacks.userId, userId),
          eq(userFavoritePacks.packId, packId),
        ),
      )
      .returning();
  }
}
