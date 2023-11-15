import type { Relation as TRelation } from '@prisma/client/edge';
import { prisma } from '../extension';

type ExtendedRelation = {
  toJSON: () => Partial<TRelation>;
  save: () => Promise<void>;
};

const modelMappingFunc = (type: string) => {
  switch (type) {
    case 'node':
    case 'Node':
    case 'n': // In case 'n' is sent
    case 'N': // In case 'N' is sent
      return prisma.node;
    case 'way':
    case 'Way':
    case 'w': // Map 'W' to Way
    case 'W': // Map 'W' to Way
      return prisma.way;
    case 'relation':
    case 'Relation':
    case 'r': // In case 'r' is sent
    case 'R': // In case 'R' is sent
      return prisma.relation;
    default:
      return null;
  }
};
const Relation = <T extends TRelation>(
  prismaRelation: T,
): T & ExtendedRelation => {
  if (!prismaRelation) return;
  return Object.assign(prismaRelation, {
    async toJSON(): Promise<Partial<TRelation>> {
      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...relationObject
      } = this.toObject();

      for (const member of relationObject.members) {
        const Model = modelMappingFunc(member.type);
        if (Model) {
          // @ts-expect-error Union does not share same signature
          member.refId = await Model.findUnique({
            where: {
              id: member.refId,
            },
          });
        }
      }
      return relationObject;
    },
    async save(): Promise<void> {
      if (this.osm_type !== 'relation') {
        throw new Error('This is not a relation');
      }
      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...relationObject
      } = this.toObject();

      await prisma.relation.upsert({
        where: {
          id,
        },
        update: relationObject,
        create: relationObject,
      });
    },
  });
};

export { Relation };
