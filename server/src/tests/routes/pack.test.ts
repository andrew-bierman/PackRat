import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { setupTest } from '../utils/testHelpers';
import type { trpcCaller } from '../utils/testHelpers';
import type { Pack } from '../../db/schema';
import { env } from 'cloudflare:test';

describe('Template routes', () => {
  let caller: trpcCaller;
  let pack: Pack;

  beforeAll(async () => {
    caller = await setupTest(env);
  });

  describe('Get public packs', () => {
    it('Get public packs', async () => {
      const packs = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
      expect(packs).toBeDefined();
      [pack] = packs;
    });
  });

  describe('Get packs by owner', () => {
    it('Get packs by owner', async () => {
      const ownerId = pack?.owner_id?.toString();
      if (ownerId) {
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
    it('Edit pack', async () => {
      if (pack) {
        const nameToBeUpdated = 'updated pack';
        //! need to convert dates to string for input
        const updatedPack = await caller
          .editPack({
            ...pack,
            id: pack?.id?.toString(),
            is_public: pack?.is_public === null ? false : pack?.is_public,
            name: nameToBeUpdated,
          })
          .then((pack) => pack);
        expect(updatedPack.name).toEqual(nameToBeUpdated);
        pack = updatedPack;
      }
    });
  });

  describe('Create pack', () => {
    it('Create pack', async () => {
      const { id, ...partialPack } = pack;
      if (partialPack.owner_id) {
        const input = {
          ...partialPack,
          owner_id: partialPack.owner_id.toString(),
          is_public:
            partialPack.is_public === null ? false : partialPack.is_public,
        };
        const response = (await caller.addPack(input)) as unknown as {
          createdPack: any;
        };
        expect(response.createdPack).toBeDefined();
      }
    });
  });

  describe('Delete pack', () => {
    it('Delete pack', async () => {
      if (pack) {
        //! response format should be consistent for all routes
        const { msg } = await caller.deletePack({
          packId: pack.id.toString(),
        });
        expect(msg).toEqual('pack was deleted successfully');
      }
    });
  });
});
