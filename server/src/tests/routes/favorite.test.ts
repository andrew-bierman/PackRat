import mongoose from 'mongoose';
import { createCaller } from 'server/src/routes/trpcRouter';
import { userSignUp } from '@packrat/validations';
import { generateMock } from '@anatine/zod-mock';

beforeEach(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  await mongoose.disconnect();
});

const caller = createCaller({});

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
        const currentUser = (await caller.addToFavorite({
          packId,
          userId,
        })) as any;

        expect(currentUser?._id.toString()).toEqual(userId);
      }
    });
  });

  describe("Get user's favorites", () => {
    test("Get user's favorites", async () => {
      if (pack) {
        const userId = user._id.toString();

        const currentUser = await caller.getUserFavorites({
          userId,
        });

        const [favorite] = currentUser.favorites;

        expect(favorite).toBeDefined();
      }
    });
  });

  describe("Get user's favorite packs", () => {
    test("Get user's favorites packs", async () => {
      if (pack) {
        const userId = user._id.toString();

        const [packs] = await caller.getFavoritePacksByUser({
          userId,
        });

        expect(packs).toBeDefined();
      }
    });
  });
});
