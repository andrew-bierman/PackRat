import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { env } from 'cloudflare:test';
import type { Pack, User } from '../../db/schema';
import { User as UserClass } from '../../drizzle/methods/User';
import { Pack as PackClass } from '../../drizzle/methods/pack';

describe('Favorite routes', () => {
  let caller: trpcCaller;
  const userClass = new UserClass();
  const packClass = new PackClass();

  let user: User;
  let pack: Pack;

  beforeAll(async () => {
    const executionCtx: ExecutionContext = {
      waitUntil: () => {},
      passThroughOnException: () => {},
    };
    caller = await setupTest(env, executionCtx);
    user = (await userClass.create({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    })) as User;
  });

  beforeEach(async () => {
    pack = await packClass.create({
      name: 'test',
      is_public: true,
      owner_id: user.id,
      type: 'test',
    });
    packClass.update({});
  });

  describe('addToFavorite', () => {
    it('should add the pack to favorites of the user', async () => {
      const { message } = await caller.addToFavorite({
        packId: pack.id,
        userId: user.id,
      });
      expect(message).toEqual('Successfully added the pack');
    });
    it('should remove the pack from favorites of the user', async () => {
      // Add to favorites to remove it later
      await caller.addToFavorite({
        packId: pack.id,
        userId: user.id,
      });
      const { message } = await caller.addToFavorite({
        packId: pack.id,
        userId: user.id,
      });
      expect(message).toEqual(
        "Successfully removed the pack from the user's favorites list",
      );
    });
  });

  describe('getUserFavorites', () => {
    it("should get user's favorites", async () => {
      await caller.addToFavorite({
        packId: pack.id,
        userId: user.id,
      });
      const favorites = await caller.getUserFavorites({
        userId: user.id,
        pagination: { limit: 10, offset: 0 },
      });
      expect(favorites).toBeDefined();
      expect(favorites.data.length).toEqual(1);
      expect(favorites.data[0].id).toEqual(pack.id);
    });
  });

  describe('getFavoritePacksByUser', () => {
    it("should get user's favorites packs", async () => {
      await caller.addToFavorite({
        packId: pack.id,
        userId: user.id,
      });
      const packs = await caller.getFavoritePacksByUser({
        userId: user.id,
      });
      expect(packs).toBeDefined();
      expect(packs.length).toEqual(1);
      expect(packs[0].id).toEqual(pack.id);
    });
  });
});
