import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { RText } from '@packrat/ui';
import { useRouter } from 'app/hooks/router';
import { createParam } from 'app/hooks/params';
import useTheme from '../../hooks/useTheme';
import { theme } from '../../theme';
import MapContainer from '../map/MapContainer';
import {
  defaultShape,
  convertPhotonGeoJsonToShape,
} from '../../utils/mapFunctions';
import TripCard from '../TripCard';
import LargeCard from '../card/LargeCard';
import WeatherCard from '../weather/WeatherCard';
import { Ionicons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { WeatherData } from '../weather/WeatherData';
import { useGEOLocationSearch } from 'app/hooks/geojson';

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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const { currentDestination } = useCurrentDestination();
  const [osm] = useGEOLocationSearch();
  const {
    data: geoJSON,
    isLoading,
    isError,
  } = useGetPhotonDetails({
    properties: {
      osm_id: osm?.osmId,
      osm_type: osm?.osmType,
    },
  });

  const shape = geoJSON ?? defaultShape;

  const map = () => <MapContainer shape={shape} />;

  return (
    <ScrollView>
      {!isLoading && !isError && (
        <View style={styles.container}>
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
          <WeatherData geoJSON={currentDestination} />
        </View>
      )}
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
