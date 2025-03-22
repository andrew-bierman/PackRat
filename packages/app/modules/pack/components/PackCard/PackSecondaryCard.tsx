import { Card, RStack, RText } from '@packrat/ui';
import React, { type FC } from 'react';
import { PackImage } from './PackImage';
import {
  CreatedAtLabel,
  FavoriteButton,
  type FeedCardProps,
} from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { StarIcon } from 'lucide-react-native';

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
        <RStack
          style={{
            flexDirection: 'column',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <RText>
            {!isNaN(props.details.similarityScore ?? NaN)
              ? 'Similarity'
              : 'Score'}
          </RText>
          <RStack
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <StarIcon size={16} />
            <RText>
              {!isNaN(props.details.similarityScore ?? NaN)
                ? props.details.similarityScore
                : props.details.score}
            </RText>
          </RStack>
        </RStack>
      }
      type={props.cardType}
    />
  );
};
