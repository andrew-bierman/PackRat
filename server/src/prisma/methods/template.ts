import type { Template as TTemplate } from '@prisma/client/edge';

type ExtendedItem = {
  toJSON: () => Partial<TTemplate>;
};

const Template = <T extends TTemplate>(prismaTemplate: T): T & ExtendedItem => {
  if (!prismaTemplate) return;
  return Object.assign(prismaTemplate, {
    toJSON(): Partial<TTemplate> {
      const {
        // destructure methods
        toJSON,
        ...templateObject
      } = this;

      const documentKeys = Object.keys(templateObject).filter((key) =>
        key.includes('Document'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '');
        templateObject[newKey] = templateObject[key];
        delete templateObject[key];
      }

      return templateObject;
    },
  });
};

export { Template };
