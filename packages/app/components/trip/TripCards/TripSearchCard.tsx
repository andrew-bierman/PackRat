import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { useGEOLocationSearch } from 'app/hooks/geojson';

import { FontAwesome } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';
import { useScreenWidth } from 'app/hooks/common';
import { SCREEN_WIDTH } from 'app/constants/breakpoint';

type TripSearchCardProps = {
  searchRef: any;
};

export const TripSearchCard = ({ searchRef }: TripSearchCardProps) => {
  const { currentTheme } = useTheme();
  const [, setGEOLocation] = useGEOLocationSearch();
  const { screenWidth } = useScreenWidth();

  const handleSelectLocation = (geoJSON) => {
    setGEOLocation(geoJSON);
  };

  return (
    <TripCardBase
      loadStyles={loadStyles}
      icon={() => (
        <FontAwesome
          name="map"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      title="Where are you heading?"
    >
      <View style={{ width: screenWidth <= SCREEN_WIDTH ? '50vw' : '30vw' }}>
        <PlacesAutocomplete ref={searchRef} onSelect={handleSelectLocation} />
      </View>
    </TripCardBase>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    backgroundColor: currentTheme.colors.card,
    padding: currentTheme.size.mobilePadding,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingHorizontal: 60,
    paddingVertical: 70,
    height: Platform.OS === 'web' ? 450 : '100%',
    alignSelf: 'center',
  };
};
