import React, { Suspense } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import {
  RText as OriginalRText,
  RButton,
  RStack,
  XStack,
  YStack,
} from '@packrat/ui';
import { LayoutCard } from 'app/components/LayoutCard';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';
import { useRouter } from 'app/hooks/router';
import { WeatherData } from 'app/components/weather/WeatherData';
import { Map } from 'app/modules/map';
import { DestinationDetails } from './components/DestinationDetails';
import Layout from 'app/components/layout/Layout';
import { DestinationSearchMobile } from './components/DestinationSearchMobile';
import { AsyncView } from 'app/components/AsyncView/AsyncView';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import useResponsive from 'app/hooks/useResponsive';

const RText: any = OriginalRText;

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

export const DestinationScreen = () => {
  const styles = useCustomStyles(loadStyles);
  const { gtSm } = useResponsive();

  const {
    currentDestination,
    latLng,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useCurrentDestination();
  const [osm] = useGEOLocationSearch();
  const {
    data: shape,
    isFetching: isMapLoading,
    isError: isMapError,
  } = useGetPhotonDetails(
    {
      properties: {
        osm_id: osm?.osmId,
        osm_type: osm?.osmType,
      } as any,
    },
    false,
  );

  const destinationProperties = merge(
    getValidObject(shape?.features?.[0]?.properties),
    getValidObject(currentDestination?.properties),
  );

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

  const detailsSection = (
    <YStack style={{ width: '100%', gap: 16 }}>
      <AsyncView
        isError={isDetailsError}
        errorComponentProps={{ message: 'Failed to fetch destination details' }}
        isLoading={isDetailsLoading}
      >
        <DestinationDetails destinationProperties={destinationProperties} />
      </AsyncView>
      <LayoutCard>
        <WeatherData latLng={latLng} />
      </LayoutCard>
    </YStack>
  );

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={{ padding: 2 }}>
            {Platform.OS === 'web' ? (
              <PlacesAutocomplete
                onSelect={handleSearchSelect}
                placeholder={'Search by park, city, or trail'}
              />
            ) : (
              <DestinationSearchMobile />
            )}
          </View>
          <XStack
            style={{
              gap: 16,
              flexDirection: gtSm ? 'row' : 'column',
              position: 'relative',
            }}
          >
            <AsyncView
              isError={isMapError}
              errorComponentProps={{
                message: 'Failed to fetch map polygon',
              }}
              isLoading={isMapLoading}
            >
              <View style={{ flex: 1, width: gtSm ? 'auto' : '100%' }}>
                <Map shape={shape} />
              </View>
            </AsyncView>
            <View style={{ width: gtSm ? 350 : '100%' }}>{detailsSection}</View>
          </XStack>
        </ScrollView>
      </View>
    </Layout>
  );
};

const loadStyles = (theme) => {
  const { isDark, currentTheme } = theme;
  return {
    container: {
      width: '100%',
      maxWidth: 1440,
      padding: 16,
    },
    headerContainer: {
      alignSelf: 'center',
      width: '90%',
      backgroundColor: currentTheme.colors.card,
      padding: 25,
      borderRadius: 10,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    headerText: {
      color: currentTheme.colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerSubText: {
      color: isDark ? 'white' : currentTheme.colors.whiteDarkGrey,
      fontSize: 16,
      marginTop: 5,
    },
    languageContainer: {
      flexWrap: 'wrap',
      marginTop: 10,
    },
    languageText: {
      color: isDark ? 'white' : currentTheme.colors.whiteDarkGrey,
      fontSize: 14,
      marginRight: 10,
      marginBottom: 5, // Add margin to provide spacing between the language texts
    },
    cardContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
      backgroundColor: isDark ? '#2D2D2D' : currentTheme.colors.white,
      padding: 25,
    },
  };
};

const getValidObject = (obj: any) => {
  if (!isObject(obj)) return {};

  return obj;
};
