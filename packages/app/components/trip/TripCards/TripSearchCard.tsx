import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { useGEOLocationSearch } from 'app/hooks/geojson';

import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';
import useResponsive from 'app/hooks/useResponsive';

type TripSearchCardProps = {
  searchRef: any;
};

export const TripSearchCard = ({ searchRef }: TripSearchCardProps) => {
  const { currentTheme } = useTheme();
  const [, setGEOLocation] = useGEOLocationSearch();

  const handleSelectLocation = (geoJSON) => {
    setGEOLocation(geoJSON);
  };
  const { xs } = useResponsive();

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
      <View style={{ width: xs ? '50vw' : '30vw', zIndex: 1 }}>
        <PlacesAutocomplete ref={searchRef} onSelect={handleSelectLocation} />
      </View>
    </TripCardBase>
  );
};

const loadStyles = (theme) => {
  const { xxs } = useResponsive();

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
    height: xxs ? '100%' : 450,
    alignSelf: 'center',
  };
};
