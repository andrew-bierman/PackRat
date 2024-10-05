import { Card, RStack, RText } from '@packrat/ui';
import React, { type FC } from 'react';
import { TripImage } from './TripImage';
import { type FeedCardProps } from 'app/modules/feed';
import { type TripDetails } from 'modules/trip/model';
import { LocationLabel } from '../LocationLabel';
import { ScoreLabel } from 'app/components/ScoreLabel';

interface TripCardProps extends FeedCardProps<TripDetails> {}

export const TripSecondaryCard: FC<TripCardProps> = (props) => {
  return (
    <Card
      title={props.title}
      link={`/trip/${props.id}`}
      image={
        <TripImage style={{ justifyContent: 'flex-start', paddingTop: 15 }} />
      }
      actions={
        <RStack
          style={{
            flexDirection: 'column',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <RText>Score</RText>
          <ScoreLabel score={props.details.score} />
        </RStack>
      }
      subtitle={<LocationLabel location={props.details.destination} />}
      type={props.cardType}
    />
  );
};
