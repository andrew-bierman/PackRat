import React, { type FC } from 'react';
import { type FeedCardProps } from 'app/modules/feed';
import { TripPrimaryCard } from './TripPrimaryCard';
import { TripSecondaryCard } from './TripSecondaryCard';
import { type TripDetails } from 'modules/trip/model';

interface TripCardProps extends FeedCardProps<TripDetails> {}

const TripCards = {
  primary: TripPrimaryCard,
  secondary: TripSecondaryCard,
};

export const TripCard: FC<TripCardProps> = (props) => {
  const TripCardComponent = TripCards[props.cardType];

  return <TripCardComponent {...props} />;
};
