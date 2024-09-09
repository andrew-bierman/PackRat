import React, { type FC } from 'react';
import { type FeedCardProps } from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { PackPrimaryCard } from './PackPrimaryCard';
import { PackSecondaryCard } from './PackSecondaryCard';

interface PackCardProps extends FeedCardProps<PackDetails> {}

const PackCards = {
  primary: PackPrimaryCard,
  secondary: PackSecondaryCard,
};

export const PackCard: FC<PackCardProps> = (props) => {
  const PackCardComponent = PackCards[props.cardType];

  return <PackCardComponent {...props} />;
};
