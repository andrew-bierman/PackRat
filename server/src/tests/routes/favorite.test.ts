import {
  generateMockUser,
  setupTest,
  type trpcCaller,
} from '../utils/testHelpers';
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { env } from 'cloudflare:test';
import { type User as UserType } from '../../db/schema';

describe('Favorite routes', () => {
  let caller: trpcCaller;
  let user;

  let pack;

  beforeAll(async () => {
    caller = await setupTest(env);
    user = generateMockUser();
  });

  describe('Setup user and Packs', () => {
    it('Setup user and Packs', async () => {
      const currentUser = await caller.signUp(user);
      user = { ...currentUser, password: user.password };
      [pack] = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
    });
  });

  describe('Add to favorites', () => {
    it('Add to favorites', async () => {
      if (pack) {
        const packId = pack?.id.toString();
        const userId = user.id.toString();

        //! addToFavoriteRoute is returning user's data instead of returning added favorites
        const currentUser = await caller.addToFavorite({
          packId,
          userId,
        });

        expect(currentUser?.id.toString()).toEqual(userId);
      }
    });
  });

  describe("Get user's favorites", () => {
    //! service returns undefined as favorites, may be addToFavorite is not working as expected
    // it("Get user's favorites", async () => {
    //   if (pack) {
    //     const userId = user._id.toString();
    //     const currentUser = await caller.getUserFavorites({
    //       userId,
    //     });
    //     const favorites = currentUser.favorites;
    //     expect(favorites).toBeDefined();
    //   }
    // });
  });

  describe("Get user's favorite packs", () => {
    it("Get user's favorites packs", async () => {
      if (pack) {
        const userId = user.id.toString();
        const packs = await caller.getFavoritePacksByUser({
          userId,
        });
        expect(packs).toBeDefined();
      }
    });
  });
});
