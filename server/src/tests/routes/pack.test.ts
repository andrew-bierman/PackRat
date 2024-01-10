import mongoose from 'mongoose';
import { createCaller } from '../../routes/trpcRouter';

beforeEach(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  await mongoose.disconnect();
});

const caller = createCaller({});

describe('Template routes', () => {
  let pack;

  describe('Get public packs', () => {
    test('Get public packs', async () => {
      const packs = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });

      expect(packs).toBeDefined();

      [pack] = packs;
    });
  });

  describe('Get packs by owner', () => {
    test('Get packs by owner', async () => {
      if (pack) {
        const ownerId = pack?.owner_id.toString();

        const {
          message,
          packs: [ownerPack],
        } = await caller.getPacks({
          ownerId,
          queryBy: 'Favorite',
        });

        expect(message).toEqual('Packs retrieved successfully');
        expect(ownerPack?.owner_id.toString()).toEqual(ownerId);
      }
    });
  });

  describe('Edit pack', () => {
    test('Edit pack', async () => {
      if (pack) {
        const nameToBeUpdated = 'updated pack';

        //! need to convert dates to string for input
        const updatedPack = await caller
          .editPack({
            ...pack,
            _id: pack?._id?.toString(),
            is_public: pack?.is_public,
            name: nameToBeUpdated,
          })
          .then((pack) => pack.toJSON());

        expect(updatedPack.name).toEqual(nameToBeUpdated);

        pack = updatedPack;
      }
    });
  });

  describe('Create pack', () => {
    test('Create pack', async () => {
      const { _id, ...partialPack } = pack;

      const input = {
        ...partialPack,
        owner_id: partialPack.owner_id.toString(),
      };

      //! response format should be consistent for all routes

      const { createdPack } = await caller.addPack(input);

      expect(createdPack).toBeDefined();
    });
  });

  describe('Delete pack', () => {
    test('Delete pack', async () => {
      if (pack) {
        //! response format should be consistent for all routes
        const { msg } = await caller.deletePack({
          packId: pack._id.toString(),
        });

        expect(msg).toEqual('pack was deleted successfully');
      }
    });
  });
});
