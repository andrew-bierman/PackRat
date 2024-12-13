import { Map } from 'app/modules/map';
import React from 'react';
import { getTripGEOURI } from '../utils';
import { AsyncView } from 'app/components/AsyncView';
import { View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';
import { Platform } from 'react-native';

interface TripMapCardProps {
  isLoading?: boolean;
  shape?: any;
  isMapError: boolean;
  onVisibleBoundsChange?: (bounds: number[]) => void;
  tripId?: string;
  initialBounds?: any;
}

export const TripMapCard = ({
  isLoading,
  shape,
  initialBounds,
  tripId,
  isMapError,
  onVisibleBoundsChange,
}: TripMapCardProps) => {
  const { gtSm } = useResponsive();

  return (
    <AsyncView isError={isMapError} isLoading={isLoading}>
      <View
        style={{
          flex: gtSm ? 1 : undefined,
          width: gtSm ? 'auto' : '100%',
          height: Platform.OS === 'web' ? 'auto' : 300,
        }}
      >
        <Map
          style={{ width: '100%', height: 320 }}
          shapeURI={tripId ? getTripGEOURI(tripId) : undefined}
          onVisibleBoundsChange={onVisibleBoundsChange}
          initialBounds={initialBounds}
          shape={shape}
        />
      </View>
    </AsyncView>
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
    margin: 80,
    overflow: 'hidden',
    alignSelf: 'center',
  };
};
