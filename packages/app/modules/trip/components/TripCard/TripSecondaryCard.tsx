import { Card, RStack } from '@packrat/ui';
import React, { type FC } from 'react';
import { TripImage } from './TripImage';
import {
  CreatedAtLabel,
  FavoriteButton,
  type FeedCardProps,
} from 'app/modules/feed';
import { type TripDetails } from 'modules/trip/model';

interface TripCardProps extends FeedCardProps<TripDetails> {}

export const TripSecondaryCard: FC<TripCardProps> = (props) => {
  return (
    <Card
      title={props.title}
      link={`/pack/${props.id}`}
      image={
        <TripImage style={{ justifyContent: 'flex-start', paddingTop: 15 }} />
      }
      subtitle={<CreatedAtLabel date={props.createdAt} />}
      actions={
        <RStack style={{ flexDirection: 'row', gap: 12 }}>
          <FavoriteButton
            count={props.favoriteCount}
            isAuthUserFavorite={props.isUserFavorite}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.toggleFavorite();
            }}
          />
        </RStack>
      }
      type={props.cardType}
    />
  );
};
