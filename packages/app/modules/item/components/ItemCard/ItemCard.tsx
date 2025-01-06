import React, { type FC } from 'react';
import { ItemPrimaryCard } from './ItemPrimaryCard';
import { ItemSecondaryCard } from './ItemSecondaryCard';
import type { ItemCardProps } from './model';

interface Props extends ItemCardProps {
  cardType: 'primary' | 'secondary';
}

const ItemCards = {
  primary: ItemPrimaryCard,
  secondary: ItemSecondaryCard,
};

export const ItemCard: FC<Props> = (props) => {
  const PackCardComponent = ItemCards[props.cardType];

  return <PackCardComponent {...props} />;
};
