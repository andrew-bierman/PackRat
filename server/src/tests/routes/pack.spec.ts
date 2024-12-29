import { describe, it, vi, expect, beforeAll, beforeEach } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Pack as PackClass } from '../../drizzle/methods/pack';
import { User as UserClass } from '../../drizzle/methods/User';
import type { Pack, User } from '../../db/schema';
import type { ExecutionContext } from 'hono';

const { mockSyncRecord, mockDeleteVector, mockSearchVector } = vi.hoisted(
  () => {
    return {
      mockSyncRecord: vi.fn(),
      mockDeleteVector: vi.fn(),
      mockSearchVector: vi.fn(),
    };
  },
);
vi.mock('../../vector/client', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../vector/client')>();
  return {
    ...mod,
    VectorClient: {
      instance: {
        syncRecord: mockSyncRecord,
        delete: mockDeleteVector,
        search: mockSearchVector,
      },
    },
  };
});

describe('Pack routes', () => {
  let caller: trpcCaller;
  let executionCtx: ExecutionContext;
  const packClass = new PackClass();
  const userClass = new UserClass();

  let pack: Pack;
  let owner: User;

  beforeAll(async () => {
    executionCtx = {} as ExecutionContext;
    caller = await setupTest(env, executionCtx);
    owner = (await userClass.create({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    })) as User;

    // clear modules cache to ensure that dependents use the latest mock modules
    // this prevents unusual assertion failures during reruns in watch mode
    vi.resetModules();
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
    const nameToBeUpdated = 'updated pack';
    let packId: string;
    let isPublic: boolean;

    it('should update pack name', async () => {
      isPublic = pack?.is_public === null ? false : pack?.is_public;
      const updatedPack = await caller.editPack({
        ...pack,
        id: pack?.id?.toString(),
        is_public: isPublic,
        name: nameToBeUpdated,
      });
      packId = updatedPack.id;
      expect(updatedPack.name).toEqual(nameToBeUpdated);
    });

    it('should sync edited pack with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith(
        {
          id: packId,
          content: nameToBeUpdated,
          metadata: { isPublic, ownerId: pack.owner_id },
          namespace: 'packs',
        },
        true,
      );
    });
  });

  describe('addPack', () => {
    let createdPackId: string;
    let ownerId: string;

    it('should create a pack', async () => {
      const { id, ...partialPack } = pack;
      ownerId = partialPack.owner_id ?? 'default_owner_id';
      const input = {
        ...partialPack,
        name: 'test 123',
        is_public: partialPack.is_public ?? false,
        owner_id: ownerId,
      };
      const createdPack = await caller.addPack(input);
      createdPackId = createdPack.id;
      expect(createdPack).toBeDefined();
    });

    it('should sync created pack with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith({
        id: createdPackId,
        content: 'test 123',
        metadata: { isPublic: true, ownerId },
        namespace: 'packs',
      });
    });
  });

  describe('deletePack', () => {
    let packId: string;
    it('should delete the pack', async () => {
      packId = pack.id;
      const { msg } = await caller.deletePack({
        packId,
      });
      expect(msg).toEqual('pack was deleted successfully');
    });

    it('should delete the pack from vectorize as well', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockDeleteVector).toHaveBeenCalledWith(packId);
    });
  });

  describe('getSimilarPacks', () => {
    let similarPacks: any = null;
    let packId: string;
    it('should invoke vector search', async () => {
      packId = pack.id;
      mockSearchVector.mockResolvedValue({
        result: { matches: [{ id: packId, score: 0.89519173 }] },
      });

      similarPacks = await caller.getSimilarPacks({
        id: packId,
        limit: 3,
      });
      expect(mockSearchVector).toHaveBeenCalledWith(pack.name, 'packs', 3, {
        isPublic: true,
      });
    });

    it('should return similar packs', async () => {
      expect(similarPacks).toEqual([
        { ...pack, id: packId, similarityScore: 0.89519173 },
      ]);
    });
  });
});
