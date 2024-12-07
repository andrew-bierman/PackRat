import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Container, Text } from 'native-base';
import { useRouter, useSearchParams } from 'expo-router';
import useTheme from '../../hooks/useTheme';
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import MapContainer from '../map/MapContainer';
import {
  defaultShape,
  convertPhotonGeoJsonToShape,
} from '../../utils/mapFunctions';
import TripCard from '../TripCard';
import LargeCard from '../card/LargeCard';
import WeatherCard from '../WeatherCard';
import { Ionicons } from '@expo/vector-icons';
import {
  processGeoJSON,
  getDestination,
  photonDetails,
  setSelectedSearchResult,
  setWeatherObject,
  setWeatherWeek,
} from '../../store/destinationStore';
import { fetchWeather, fetchWeatherWeek } from '../../store/weatherStore';
import useCustomStyles from '~/hooks/useCustomStyles';

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
      <Text style={styles.headerText}>
        {name !== 'N/A' ? name : 'Destination'}
      </Text>
      <Text style={styles.headerSubText}>
        {county !== 'N/A' && `${county}, `}
        {state !== 'N/A' && `${state}, `}
        {country !== 'N/A' ? country : ''}
      </Text>
      <View style={styles.languageContainer}>
        {Object.entries(languageNames).map(([key, value], index) => {
          if (index < 3 && typeof value === 'string') {
            return (
              <Text key={key} style={styles.languageText}>
                {`${key.split(':')[1].toUpperCase()}: ${value}`}
              </Text>
            );
          }
        })}
      </View>
    </View>
  );
};

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} geoJSON - The GeoJSON data.
 * @return {JSX.Element|null} The WeatherCard component if weatherObject and weatherWeek are truthy, otherwise null.
 */
const WeatherData = ({ geoJSON }) => {
  const dispatch = useDispatch();
  const weatherObject = useSelector((state) => state.destination.weatherObject);
  const weatherWeek = useSelector((state) => state.destination.weatherWeek);

  useEffect(() => {
    /**
     * Fetches weather data based on the provided geoJSON.
     *
     * @return {Promise<void>} - A Promise that resolves when the weather data is fetched and stored.
     */
    const fetchWeatherData = async () => {
      if (geoJSON?.features) {
        const { coordinates } = geoJSON.features[0].geometry;

        // const [lon, lat] = coordinates;
        let lon, lat;

        if (coordinates[0] && Array.isArray(coordinates[0])) {
          [lon, lat] = coordinates[0];
        } else {
          [lon, lat] = coordinates;
        }

        if (lat && lon) {
          try {
            const weatherObjRes = await dispatch(fetchWeather({ lat, lon }));
            const weatherWkRes = await dispatch(fetchWeatherWeek({ lat, lon }));
            dispatch(setWeatherObject(weatherObjRes.payload));
            dispatch(setWeatherWeek(weatherWkRes.payload.list.slice(0, 4)));
          } catch (err) {
            console.error(err);
          }
        }
      }
    };
    fetchWeatherData();
  }, [geoJSON]);

  return weatherObject && weatherWeek ? (
    <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
  ) : null;
};

export const DestinationPage = () => {
  console.log('destination page');
  const router = useRouter();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const dispatch = useDispatch();

  const { destinationId, id, type, lat, lon } = useSearchParams();
  const photonDetailsStore = useSelector(
    (state) => state.destination.photonDetails,
  );

  const currentDestination = {
    geoJSON: photonDetailsStore,
  };

  const geoJSON = currentDestination?.geoJSON;
  const selectedSearchResult = useSelector(
    (state) => state.destination.selectedSearchResult,
  );

  useEffect(() => {
    if (destinationId) {
      if (type && id) {
        const matchPhotonFormattingForData = {
          properties: {
            osm_id: id,
            osm_type: type,
          },
        };

        dispatch(photonDetails(matchPhotonFormattingForData));
      } else if (destinationId && !type && !id && destinationId !== 'query') {
        dispatch(getDestination(destinationId));
      }
    }
  }, [destinationId]);

  if (!currentDestination) {
    return null;
  }

  const shape = geoJSON ?? defaultShape;

  const map = () => <MapContainer shape={shape} />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <DestinationHeader
          geoJSON={geoJSON}
          selectedSearchResult={selectedSearchResult}
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
        <WeatherData geoJSON={geoJSON} />
      </View>
    </ScrollView>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
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
      width: '100%',
      backgroundColor: currentTheme.colors.white,
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
      color: currentTheme.colors.textDarkGrey,
      fontSize: 16,
      marginTop: 5,
    },
    languageContainer: {
      flexWrap: 'wrap',
      marginTop: 10,
    },
    languageText: {
      color: currentTheme.colors.textDarkGrey,
      fontSize: 14,
      marginRight: 10,
      marginBottom: 5, // Add margin to provide spacing between the language texts
    },
  };
};
