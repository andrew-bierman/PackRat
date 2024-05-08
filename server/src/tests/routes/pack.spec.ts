import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Pack as PackClass } from '../../drizzle/methods/pack';
import { User as UserClass } from '../../drizzle/methods/User';
import type { Pack, User } from '../../db/schema';

describe('Pack routes', () => {
  let caller: trpcCaller;
  const packClass = new PackClass();
  const userClass = new UserClass();

  let pack: Pack;
  let owner: User;

  beforeAll(async () => {
    caller = await setupTest(env);
    owner = await userClass.create({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    });
  });

  beforeEach(async () => {
    pack = await packClass.create({
      name: 'test',
      is_public: true,
      type: 'test',
      owner_id: owner.id,
    });
  });

  describe('getPublicPacks', () => {
    it('should get public packs', async () => {
      const packs = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
      expect(packs).toBeDefined();
    });
  });

  describe('getPacks', () => {
    it('should get packs by owner', async () => {
      const {
        message,
        packs: [ownerPack],
      } = await caller.getPacks({
        ownerId: owner.id,
        queryBy: 'Favorite',
      });
      expect(message).toEqual('Packs retrieved successfully');
      expect(ownerPack?.owner_id).toEqual(owner.id);
    });
  });

  describe('editPack', () => {
    it('should update pack name', async () => {
      const nameToBeUpdated = 'updated pack';
      const updatedPack = await caller.editPack({
        ...pack,
        name: nameToBeUpdated,
      });
      expect(updatedPack.name).toEqual(nameToBeUpdated);
    });
  });

  describe('addPack', () => {
    it('should create a pack', async () => {
      const { id, ...partialPack } = pack;
      const input = {
        ...partialPack,
        name: 'test 123',
      };
      const createdPack = await caller.addPack(input);
      expect(createdPack).toBeDefined();
    });
  });

  describe('deletePack', () => {
    it('should delete the pack', async () => {
      const { msg } = await caller.deletePack({
        packId: pack.id,
      });
      expect(msg).toEqual('pack was deleted successfully');
    });
  });
});
