import React from 'react';
import { ScrollView, View } from 'react-native';
import MapContainer from '../map/MapContainer';
import LargeCard from '../card/LargeCard';
import WeatherCard from '../WeatherCard';
import { Ionicons } from '@expo/vector-icons';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useSearchParams } from 'expo-router';
import { useWeatherData } from '../../queries/weatherQueries'; // Import the weather query
import { useDestinationData } from '../../queries/destinationQueries'; // Import the destination query

const DestinationPage = () => {
  const styles = useCustomStyles(loadStyles);
  const { destinationId, id, type, lat, lon } = useSearchParams();

  // Use the weather query hook to fetch weather data
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useWeatherData(lat, lon);

  // Use the destination query hook to fetch destination data
  const { data: destinationData } = useDestinationData(destinationId, type, id);

  if (!destinationData) {
    return null;
  }

  const geoJSON = destinationData;

  const map = () => <MapContainer shape={geoJSON} />;

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
