import React from 'react';
import useTheme from 'app/hooks/useTheme';
import { theme } from 'app/theme';
import { TripCardBase } from './TripCardBase';

import { FontAwesome5 } from '@expo/vector-icons';
import {
  RCard as OrirginalRCard,
  RParagraph as OriginalRParagraph,
  RStack,
} from '@packrat/ui';
import Carousel from 'app/components/carousel';

const RCard: any = OrirginalRCard;
const RParagraph: any = OriginalRParagraph;

interface TripPlaceCardProps {
  data: Array<{ id: string; name: string }>;
  onToggle: (place: string) => void;
  selectedValue: string[];
  icon: React.FC;
  title: string;
}

const TripPlaceCard = ({
  data,
  onToggle,
  icon,
  title,
  selectedValue = [],
}: TripPlaceCardProps) => {
  const { isDark } = useTheme();

  return (
    <TripCardBase icon={icon} title={title}>
      <RStack style={{ flex: 1, maxWidth: '100%' }}>
        <Carousel iconColor={isDark ? '#fff' : '#000'}>
          {data?.map((item) => {
            return (
              <RCard
                key={item.id}
                backgroundColor={
                  selectedValue.includes(item.id)
                    ? theme.colors.background
                    : null
                }
                onPress={() => {
                  onToggle(item.id);
                }}
                elevate
                bordered
                margin={2}
              >
                <RCard.Header padded>
                  <RParagraph
                    color={selectedValue.includes(item.id) ? 'white' : 'black'}
                  >
                    {item.name}
                  </RParagraph>
                </RCard.Header>
              </RCard>
            );
          })}
        </Carousel>
      </RStack>
    </TripCardBase>
  );
};

export const TripTrailCard = (
  props: Omit<TripPlaceCardProps, 'title' | 'icon'>,
) => {
  const { currentTheme } = useTheme();

  return (
    <TripPlaceCard
      title="Nearby Trails"
      icon={() => (
        <FontAwesome5
          name="hiking"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      {...props}
    />
  );
};

export const TripParkCard = (
  props: Omit<TripPlaceCardProps, 'title' | 'icon'>,
) => {
  const { currentTheme } = useTheme();

  return (
    <TripPlaceCard
      title="Nearby Parks"
      icon={() => (
        <FontAwesome5
          name="mountain"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      {...props}
    />
  );
};
