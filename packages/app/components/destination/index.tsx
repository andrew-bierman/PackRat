import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { RButton, RStack, RText } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import MapContainer from 'app/components/map/MapContainer';
import { defaultShape } from '../../utils/mapFunctions';
import LargeCard from '../card/LargeCard';
import WeatherCard from '../weather/WeatherCard';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { useFetchWeather, useFetchWeatherWeak } from '../../hooks/weather';
import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';
import { useRouter } from 'app/hooks/router';
import { zIndex } from '@tamagui/themes/types/tokens';

const DestinationHeader = ({ geoJSON, selectedSearchResult }) => {
  const styles = useCustomStyles(loadStyles);
  const properties = {
    ...geoJSON?.features[0]?.properties,
    ...selectedSearchResult?.properties,
  };

  let {
    country = 'N/A',
    'is_in:country': is_in_country,
    'is_in:country_code': is_in_country_code,
    state = 'N/A',
    'is_in:state': is_in_state,
    place = 'N/A',
    county = 'N/A',
    name = 'N/A',
  } = properties;

  country = is_in_country || country;
  state = is_in_state || state;

  const languageNames = Object.keys(properties).reduce((result, key) => {
    if (key.startsWith('name:')) {
      result[key] = properties[key];
    }
    return result;
  }, {});

  return (
    <View style={styles.headerContainer}>
      <RText style={styles.headerText}>
        {name !== 'N/A' ? name : 'Destination'}
      </RText>
      <RText style={styles.headerSubText}>
        {county !== 'N/A' && `${county}, `}
        {state !== 'N/A' && `${state}, `}
        {country !== 'N/A' ? country : ''}
      </RText>
      <View style={styles.languageContainer}>
        {Object.entries(languageNames).map(([key, value], index) => {
          if (index < 3 && typeof value === 'string') {
            return (
              <RText key={key} style={styles.languageText}>
                {`${key.split(':')[1].toUpperCase()}: ${value}`}
              </RText>
            );
          }
        })}
      </View>
    </View>
  );
};

// TODO refactor component
export const DestinationPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  const { currentDestination, latLng } = useCurrentDestination();

  const { data: weatherData } = useFetchWeather(latLng);

  const { data: weatherWeekData } = useFetchWeatherWeak(latLng);

  const [osm] = useGEOLocationSearch();
  const {
    data: geoJSON,
    isLoading,
    isError,
  } = useGetPhotonDetails({
    properties: {
      osm_id: osm?.osmId,
      osm_type: osm?.osmType,
    } as any,
  });

  const shape = geoJSON ?? defaultShape;

  interface SearchResult {
    properties: {
      osm_id: number;
      osm_type: string;
      name: string;
    };
    geometry: {
      coordinates: [number, number];
    };
  }

  const router = useRouter();

  const handleSearchSelect = async (selectedResult: SearchResult) => {
    try {
      const { osm_id, osm_type, name } = selectedResult.properties;

      if (!osm_id || !osm_type) {
        console.error(
          'No OSM ID or OSM type found in the selected search result',
        );
      } else {
        router.replace({
          pathname: '/destination/query',
          query: {
            osmType: osm_type,
            osmId: osm_id,
            name,
          },
        });
      }
    } catch (error) {
      console.error('errorrrrrr', error);
    }
  };

  const map = () => <MapContainer shape={shape} />;

  return (
    <ScrollView>
      {isLoading && (
        <RText style={{ width: '90%', alignSelf: 'center' }}>Loading...</RText>
      )}
      {!isLoading && !isError && (
        <View style={styles.container}>
          <View
            style={{
              zIndex: 1,
              width: '100%',
              ...styles.headerContainer,
            }}
          >
            <RStack
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {Platform.OS === 'web' ? (
                <PlacesAutocomplete
                  onSelect={handleSearchSelect}
                  placeholder={'Search by park, city, or trail'}
                />
              ) : (
                <RButton
                  style={{
                    backgroundColor: currentTheme.colors.text,
                    minWidth: '100%',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    router.push('/search');
                  }}
                >
                  <MaterialCommunityIcons
                    name="magnify"
                    size={24}
                    // color={ currentTheme.colors.background}
                  />
                  <RText color={currentTheme.colors.textDarkGrey} opacity={0.6}>
                    Search by park, city, or trail
                  </RText>
                </RButton>
              )}
            </RStack>
          </View>

          <DestinationHeader
            geoJSON={geoJSON}
            selectedSearchResult={currentDestination}
          />
          <LargeCard
            title="Map"
            Icon={() => (
              <Ionicons
                name="location"
                size={24}
                color={currentTheme.colors.textPrimary}
              />
            )}
            ContentComponent={map}
            contentProps={{ shape }}
            type="map"
          />
          <WeatherCard
            weatherObject={weatherData}
            weatherWeek={weatherWeekData}
          />
        </View>
      )}
    </ScrollView>
  );
};

const loadStyles = (theme) => {
  const { isDark, currentTheme } = theme;
  return {
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      paddingBottom: 12,
      paddingLeft: 16,
      width: '100%',
      backgroundColor: currentTheme.colors.background,
    },
    headerContainer: {
      alignSelf: 'center',
      width: '90%',
      backgroundColor: isDark ? '#2D2D2D' : currentTheme.colors.white,
      padding: 25,
      borderRadius: 10,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    headerText: {
      color: currentTheme.colors.textPrimary,
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerSubText: {
      color: isDark ? 'white' : currentTheme.colors.textDarkGrey,
      fontSize: 16,
      marginTop: 5,
    },
    languageContainer: {
      flexWrap: 'wrap',
      marginTop: 10,
    },
    languageText: {
      color: isDark ? 'white' : currentTheme.colors.textDarkGrey,
      fontSize: 14,
      marginRight: 10,
      marginBottom: 5, // Add margin to provide spacing between the language texts
    },
    cardContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
    },
  };
};
