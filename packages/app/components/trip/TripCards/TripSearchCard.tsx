import React from 'react';
import { RText, YStack } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import RSecondaryButton from 'app/components/RSecondaryButton';

import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';
import useResponsive from 'app/hooks/useResponsive';
import { useScreenWidth } from 'app/hooks/common';
import { ArrowLeft } from '@tamagui/lucide-icons';

interface TripSearchCardProps {
  searchRef: any;
  isChangePlaceMode: boolean;
  onGoBack: () => void;
  onLocationSelect: () => void;
}

export const TripSearchCard = ({
  searchRef,
  isChangePlaceMode,
  onGoBack,
  onLocationSelect,
}: TripSearchCardProps) => {
  const [, setGEOLocation] = useGEOLocationSearch();

  const handleSelectLocation = (geoJSON) => {
    setGEOLocation(geoJSON);
    onLocationSelect();
  };

  const formTitle = isChangePlaceMode
    ? 'Looking for another place?'
    : 'Where are you heading?';

  return (
    <YStack
      style={{
        gap: 16,
        maxWidth: 448,
        width: '100%',
        margin: 'auto',
        paddingBottom: 50,
      }}
    >
      <RText
        style={{
          fontWeight: 700,
          fontSize: 24,
          textAlign: 'center',
        }}
      >
        {formTitle}
      </RText>
      <PlacesAutocomplete ref={searchRef} onSelect={handleSelectLocation} />
      {isChangePlaceMode && (
        <RSecondaryButton
          icon={<ArrowLeft />}
          onPress={onGoBack}
          label="Go Back to Trip Planning"
        />
      )}
    </YStack>
  );
};
