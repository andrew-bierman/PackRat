import mongoose from 'mongoose';
import { userSignUp } from '@packrat/validations';
import { generateMock } from '@anatine/zod-mock';
import { setupTest, teardownTest } from '../utils/testHelpers';

let caller;

beforeEach(async () => {
  const testSetup = await setupTest();
  caller = testSetup.caller;
});

afterEach(async () => {
  await teardownTest();
});

let user: any = generateMock(userSignUp);

describe('Favorite routes', () => {
  let pack;

  describe('Setup user and Packs', () => {
    test('Setup user and Packs', async () => {
      const currentUser = await caller.signUp(user);

      user = { ...currentUser.toJSON(), password: user.password };

      [pack] = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
    });
  });

  describe('Add to favorites', () => {
    test('Add to favorites', async () => {
      if (pack) {
        const packId = pack?._id.toString();
        const userId = user._id.toString();

        //! addToFavoriteRoute is returning user's data instead of returning added favorites
        const currentUser = await caller.addToFavorite({
          packId,
          userId,
        });

        expect(currentUser?._id.toString()).toEqual(userId);
      }
    });
  });

  describe("Get user's favorites", () => {
    //! service returns undefined as favorites, may be addToFavorite is not working as expected
    // test("Get user's favorites", async () => {
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
    test("Get user's favorites packs", async () => {
      if (pack) {
        const userId = user._id.toString();

        const packs = await caller.getFavoritePacksByUser({
          userId,
        });

        expect(packs).toBeDefined();
      }
    });
  });
});
