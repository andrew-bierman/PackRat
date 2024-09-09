import React, { type FC } from 'react';
import { type CardType, type BaseCardProps } from './model';
import { PrimaryCard } from './PrimaryCard';
import { SecondaryCard } from './SecondaryCard';
import { RLink } from '..';

const CardComponents = {
  primary: PrimaryCard,
  secondary: SecondaryCard,
};

interface CardProps extends BaseCardProps {
  type: CardType;
}
export const Card: FC<CardProps> = ({ type, ...props }) => {
  const CardComponent = CardComponents[type];

  return (
    <RLink href={props.link}>
      <CardComponent {...props} />
    </RLink>
  );
};
