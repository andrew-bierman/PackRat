import { FC } from 'react';
import { PackTemplatePrimaryCard } from './PackTemplatePrimaryCard';
import { RouterOutput } from 'trpc';

export const PackTemplateCard: FC<RouterOutput['getPackTemplate']> = (
  props,
) => {
  // No usecase or need for packtemplate preview (aka secondary) card currently
  // Implement PackTemplateSecondaryCard whenever needed and add the logic for rendering it based on `cardType` prop
  return <PackTemplatePrimaryCard {...props} />;
};
