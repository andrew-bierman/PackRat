import React, { type FC } from 'react';
import { type FeedCardProps } from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { UserPrimaryPackCard } from './UserPrimaryPackCard';

interface UserPackCardProps extends FeedCardProps<PackDetails> {}

const UserPackCards = {
  primary: UserPrimaryPackCard,
};

export const UserPackCard: FC<UserPackCardProps> = (props) => {
  const UserCardComponent = UserPackCards[props.cardType];

  return <UserCardComponent {...props} />;
};
