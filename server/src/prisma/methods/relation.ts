import type { Relation as TRelation } from '@prisma/client/edge';

type ExtendedRelation = {
  toJSON: (prisma: any) => Partial<TRelation>;
  save: (prisma: any) => Promise<void>;
};

const modelMappingFunc = (type: string, prisma: any) => {
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
    async toJSON(prisma: any): Promise<Partial<TRelation>> {
      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...relationObject
      } = this.toObject();

      for (const member of relationObject.members) {
        const Model = modelMappingFunc(member.type, prisma);
        if (Model) {
          member.refId = await Model.findFirst({
            where: {
              id: member.refId,
            },
          });
        }
      }

      const documentKeys = Object.keys(relationObject).filter(
        (key) => key.includes('Document') || key.includes('Documents'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '').replace('Documents', '');
        relationObject[newKey] = relationObject[key];
        delete relationObject[key];
      }

      return relationObject;
    },
    async save(prisma: any): Promise<void> {
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
