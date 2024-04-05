import { RCard, RParagraph, RStack, RText } from '@packrat/ui';
import { Platform } from 'react-native';
import { Text } from 'tamagui';
import { useCardTrip } from 'app/hooks/trips/useTripCard';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from '../hooks/useTheme';
import { theme } from '../theme/index';
import Carousel from './carousel';
import MapContainer from './map/MapContainer';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { PlacesAutocomplete } from './PlacesAutocomplete';

interface TripCardProps {
  title: string;
  Icon: React.FC;
  isMap: boolean;
  shape?: any;
  data?: string[];
  isSearch: boolean;
  isTrail: boolean;
  isPark: boolean;
  isLoading: boolean;
  form?: any;
  searchRef?: any;
}

export default function TripCard({
  title,
  Icon,
  isMap,
  shape,
  data,
  form,
  isSearch,
  searchRef,
  isTrail,
  isPark,
  isLoading,
}: TripCardProps) {
  const { isDark, currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { currentTrail, currentPark, togglePlace } = form || {};
  const [, setGEOLocation] = useGEOLocationSearch();

  const handleValueChange = (value) => {
    togglePlace(isPark, value);
  };

  const handleSelectLocation = (geoJSON) => {
    setGEOLocation(geoJSON);
    return '';
  };

  return (
    <RStack
      $sm={{
        borderRadius: 6,
        flexDirection: 'column',
        width: '100%',
      }}
      $gtSm={{
        borderRadius: 12,
        flexDirection: !isMap ? 'row' : 'column',
        width: '90%',
      }}
      style={
        isSearch
          ? styles.searchContainer
          : isMap
          ? styles.mapCard
          : styles.containerMobile
          ? styles.containerMobile
          : styles.mutualStyles
      }
    >
      <RStack
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        <Icon />
        <RText
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            fontWeight: 600,
          }}
          fontFamily="$body"
        >
          {title}
        </RText>
      </RStack>
      {isMap ? (
        isLoading ? (
          <RStack>
            <Text>Loading....</Text>
          </RStack>
        ) : (
          <MapContainer shape={shape} />
        )
      ) : isSearch ? (
        <PlacesAutocomplete ref={searchRef} onSelect={handleSelectLocation} />
      ) : (
        <RStack style={{ width: '80%' }}>
          <Carousel iconColor={isDark ? '#fff' : '#000'}>
            {data?.map((item) => {
              const selectedValue = isTrail ? currentTrail : currentPark;
              return (
                <RCard
                  backgroundColor={
                    item === selectedValue ? theme.colors.background : null
                  }
                  onPress={() => {
                    handleValueChange(item);
                  }}
                  elevate
                  bordered
                  margin={2}
                >
                  <RCard.Header padded>
                    <RParagraph
                      color={item === selectedValue ? 'white' : 'black'}
                    >
                      {item}
                    </RParagraph>
                  </RCard.Header>
                </RCard>
              );
            })}
          </Carousel>
        </RStack>
      )}
    </RStack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      alignSelf: 'center',
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      padding: currentTheme.size.mobilePadding,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 25,
      flex: 1,
      paddingHorizontal: 100,
      alignSelf: 'center',
    },
    searchContainer: {
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
    },
    mapCard: {
      backgroundColor: currentTheme.colors.card,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: currentTheme.size.cardPadding,
      paddingHorizontal: currentTheme.padding.paddingInside,
      marginBottom: 20,
      overflow: 'hidden',
      alignSelf: 'center',
    },
  };
};
