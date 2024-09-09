import { Card, RStack } from '@packrat/ui';
import React, { type FC } from 'react';
import { PackImage } from './PackImage';
import {
  CreatedAtLabel,
  FavoriteButton,
  type FeedCardProps,
} from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';

interface PackCardProps extends FeedCardProps<PackDetails> {}

export const PackSecondaryCard: FC<PackCardProps> = (props) => {
  return (
    <Card
      title={props.title}
      link={`/pack/${props.id}`}
      image={
        <PackImage style={{ justifyContent: 'flex-start', paddingTop: 15 }} />
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
