import { ErrorBoundary, RStack, RText } from '@packrat/ui';
import { Map } from 'app/modules/map';
import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

interface TripMapCardProps {
  isLoading?: boolean;
  shape: any;
}

export const TripMapCard = ({ isLoading, shape }: TripMapCardProps) => {
  const { currentTheme } = useTheme();
  console.log({ shape });

  return (
    <TripCardBase
      loadStyles={loadStyles}
      icon={() => (
        <FontAwesome5
          name="route"
          size={24}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      title="Map"
    >
      {isLoading ? (
        <RStack>
          <RText>Loading....</RText>
        </RStack>
      ) : (
        <ErrorBoundary>
          <Map style={{ width: '100%', height: 320 }} shape={shape} />
        </ErrorBoundary>
      )}
    </TripCardBase>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    backgroundColor: currentTheme.colors.card,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: currentTheme.size.cardPadding,
    paddingHorizontal: currentTheme.padding.paddingInside,
    marginBottom: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  };
};
