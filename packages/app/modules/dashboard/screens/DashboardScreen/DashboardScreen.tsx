import { useRouter } from '@packrat/crosspath';
import { RScrollView, RStack } from '@packrat/ui';
import FAB from 'app/components/Fab/Fab';
import Layout from 'app/components/layout/Layout';
import { SearchResults } from 'app/components/SearchInput/SearchResults';
import { useScreenWidth } from 'app/hooks/common';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { FeedPreview } from 'app/modules/feed';
import { useAtom } from 'jotai';
import React from 'react';
import { Platform, View } from 'react-native';
import { Stack } from 'tamagui';
import { HeroSection, Section, SectionHeader } from '../../components';

import { PlaceItem } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';
import {
  placesAutocompleteSearchAtom,
  usePlacesAutoComplete,
} from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';

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

function NativeDashboardScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);

  const handleSearchSelect = async (selectedResult: SearchResult) => {
    try {
      const { osm_id, osm_type, name } = selectedResult.properties;

      const coordinates = selectedResult.geometry.coordinates;

      if (!osm_id || !osm_type) {
        console.error(
          'No OSM ID or OSM type found in the selected search result',
        );
      } else {
        router.push({
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

  const {
    data: searchResults,
    handleSelect,
    search,
    setSearch,
  } = usePlacesAutoComplete(handleSearchSelect);

  const DashboardWithNativeSearch = () => {
    if (searchQuery) {
      return (
        <SearchResults
          results={searchResults}
          onResultClick={(result) => {
            handleSelect(result); // Handle the selection logic
            setSearchQuery(''); // Clear search query
          }}
          resultItemComponent={<PlaceItem />} // Custom item rendering
          isVisible={true}
        />
      );
    }
    return <DashboardScreenInner />;
  };

  return <DashboardWithNativeSearch />;
}

const DashboardScreenInner = () => {
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  return (
    <Layout>
      <View style={{ width: '100%' }}>
        <RScrollView contentContainerStyle={styles.content} horizontal={false}>
          <RStack
            style={[
              styles.container,
              Platform.OS === 'web' ? { minHeight: '100vh' } : null,
            ]}
          >
            <HeroSection style={styles.heroBanner} />
            {Platform.OS === 'web' ? (
              <Stack
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  marginTop: 16,
                  gap: 8,
                }}
              >
                <FAB />
                {/* DISABLED PACK TEMPLATES FOR NOW */}
                {/* <Button
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => router.push('/pack-templates')}
                >
                  Templates
                </Button> */}
              </Stack>
            ) : null}

            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <Section>
                  <SectionHeader iconName="newspaper-outline" text="Feed" />
                  <FeedPreview feedType="public" />
                </Section>
              </View>
            </View>
          </RStack>
        </RScrollView>
      </View>
    </Layout>
  );
};

export const DashboardScreen = () => {
  if (Platform.OS === 'web') {
    return <DashboardScreenInner />;
  }
  return <NativeDashboardScreen />;
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { screenWidth } = useScreenWidth();

  return {
    container: {
      backgroundColor: currentTheme.colors.background,
      width: '100%',
      paddingBottom: 50,
    },
    content: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    heroBanner: {
      width: '100%',
    },
    gridContainer: {
      flexDirection: 'row',
      marginTop: 32,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      flexBasis: '100%',
      backgroundColor: currentTheme.colors.background,
    },
  };
};
