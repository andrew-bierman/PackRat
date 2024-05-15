import { eq, and } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { userFavoritePacks } from '../../db/schema';

export class UserFavoritePacks {
  async create(userId: string, packId: string) {
    try {
      const record = await DbClient.instance
        .insert(userFavoritePacks)
        .values({ userId, packId })
        .returning();
      return record;
    } catch (error) {
      throw new Error(
        `Failed to create the user favorite pack record: ${error.message}`,
      );
    }
  }

  async delete(userId: string, packId: string) {
    try {
      return await DbClient.instance
        .delete(userFavoritePacks)
        .where(
          and(
            eq(userFavoritePacks.userId, userId),
            eq(userFavoritePacks.packId, packId),
          ),
        )
        .returning();
    } catch (error) {
      throw new Error(
        `Failed to delete the user favorite pack record: ${error.message}`,
      );
    }
  }
}
