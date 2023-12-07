import type { Pack as TPack } from '@prisma/client/edge';
import {
  computeFavouritesCount,
  computeTotalScores,
  computeTotalWeight,
} from '../virtuals';

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

      const packWithTotalWeight = computeTotalWeight(packObject);
      const packWithTotalWeightAndFavouritesCount =
        computeFavouritesCount(packWithTotalWeight);
      const packWithComputedFields = computeTotalScores(
        packWithTotalWeightAndFavouritesCount,
      );

      const documentKeys = Object.keys(packWithComputedFields).filter((key) =>
        key.includes('Document'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '');
        packWithComputedFields[newKey] = packWithComputedFields[key];
        delete packWithComputedFields[key];
      }

      return packWithComputedFields;
    },
  });
};

export { Pack };
