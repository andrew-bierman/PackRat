import { Card } from '@packrat/ui';
import React, { type FC } from 'react';
import { TripImage } from './TripImage';
import { type FeedCardProps } from 'app/modules/feed';
import { type TripDetails } from 'modules/trip/model';
import { LocationLabel } from '../LocationLabel';

interface TripCardProps extends FeedCardProps<TripDetails> {}

export const TripSecondaryCard: FC<TripCardProps> = (props) => {
  return (
    <Card
      title={props.title}
      link={`/trip/${props.id}`}
      image={
        <TripImage style={{ justifyContent: 'flex-start', paddingTop: 15 }} />
      }
      subtitle={<LocationLabel location={props.details.destination} />}
      type={props.cardType}
    />
  );
};
