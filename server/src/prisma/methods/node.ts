import type { Node as TNode } from '@prisma/client/edge';

type ExtendedNode = {
  toJSON: () => Partial<TNode>;
  save: (_: any) => Promise<void>;
};

const Node = <T extends TNode>(prismaNode: T): T & ExtendedNode => {
  if (!prismaNode) return;
  return Object.assign(prismaNode, {
    toJSON(): Partial<TNode> {
      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...nodeObject
      } = this;

      const documentKeys = Object.keys(nodeObject).filter(
        (key) => key.includes('Document') || key.includes('Documents'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '').replace('Documents', '');
        nodeObject[newKey] = nodeObject[key];
        delete nodeObject[key];
      }

      return nodeObject;
    },
    async save(prisma: any): Promise<void> {
      const {
        // destructure functions
        toJSON,
        save,
        ...nodeObject
      } = this;
      await prisma.node.upsert({
        where: {
          id: nodeObject.id,
        },
        create: nodeObject,
        update: nodeObject,
      });
    },
  });
};

export { Node };
