import type { Pack as TPack } from '@prisma/client/edge';

type ExtendedItem = {
  toJSON: () => Partial<TPack>;
};

const Pack = <T extends TPack>(prismaPack: T): T & ExtendedItem => {
  if (!prismaPack) return;
  return Object.assign(prismaPack, {
    toJSON(): Partial<TPack> {
      const {
        // destructure methods
        toJSON,
        ...packObject
      } = this;

      const documentKeys = Object.keys(packObject).filter(
        (key) => key.includes('Document') || key.includes('Documents'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '').replace('Documents', '');
        packObject[newKey] = packObject[key];
        delete packObject[key];
      }

      return packObject;
    },
  });
};

export { Pack };
