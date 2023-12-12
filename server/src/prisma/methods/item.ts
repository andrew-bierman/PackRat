import type { Item as TItem } from '@prisma/client/edge';

type ExtendedItem = {
  toJSON: () => Partial<TItem>;
};

const Item = <T extends TItem>(prismaItem: T): T & ExtendedItem => {
  if (!prismaItem) return;
  return Object.assign(prismaItem, {
    toJSON(): Partial<TItem> {
      const {
        // destructure methods
        toJSON,
        ...itemObject
      } = this;

      const documentKeys = Object.keys(itemObject).filter((key) =>
        key.includes('Document'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '');
        itemObject[newKey] = itemObject[key];
        delete itemObject[key];
      }

      return itemObject;
    },
  });
};

export { Item };
