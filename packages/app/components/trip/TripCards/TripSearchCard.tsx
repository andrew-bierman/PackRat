import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { useGEOLocationSearch } from 'app/hooks/geojson';

import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';

type TripSearchCardProps = {
  searchRef: any;
};

export const TripSearchCard = ({ searchRef }: TripSearchCardProps) => {
  const { currentTheme } = useTheme();
  const [, setGEOLocation] = useGEOLocationSearch();

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
      <PlacesAutocomplete ref={searchRef} onSelect={handleSelectLocation} />
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
