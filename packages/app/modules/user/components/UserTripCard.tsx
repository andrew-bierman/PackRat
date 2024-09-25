import React, { type FC } from 'react';
import { type FeedCardProps } from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { UserPrimaryTripCard } from './UserPrimaryTripCard';

interface UserTripCardProps extends FeedCardProps<PackDetails> {}

const UserTripCards = {
  primary: UserPrimaryTripCard,
};

export const UserTripCard: FC<UserTripCardProps> = (props) => {
  const UserCardComponent = UserTripCards[props.cardType];

  return <UserCardComponent {...props} />;
};
