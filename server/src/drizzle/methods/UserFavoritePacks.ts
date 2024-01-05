import { eq, and } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { userFavoritePacks } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class UserFavoritePacks {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance
  }

  async create(userId: string, packId: string) {
    return (await this.createInstance())
      .insert(userFavoritePacks)
      .values({ userId, packId })
      .returning();
  }

  async delete(userId: string, packId: string) {
    return (await this.createInstance())
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
