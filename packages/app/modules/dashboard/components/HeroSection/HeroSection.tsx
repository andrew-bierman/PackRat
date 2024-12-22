import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RText as OriginalRText, RButton, RStack, XStack } from '@packrat/ui';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { useAuthUser } from 'app/modules/auth';
import { first } from 'lodash';
import React from 'react';
import { Platform, View } from 'react-native';

const RText: any = OriginalRText;

interface HeroSectionProps {
  onSelect?: (selectedResult: SearchResult) => void;
  style?: any;
}

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

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelect }) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  const handleSearchSelect = async (selectedResult: SearchResult) => {
    try {
      const { osm_id, osm_type, name } = selectedResult.properties;

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
      console.error('error', error);
    }
  };

  const user = useAuthUser();
  const firstNameOrUser = first(user?.name?.split(' ')) ?? 'User';
  const bannerText =
    firstNameOrUser !== 'User'
      ? `Let's find a new trail, ${String(firstNameOrUser)}`
      : "Let's find a new trail";

  return (
    <View style={styles.banner}>
      <RStack style={styles.stack}>
        <RText style={styles.title}>{bannerText}</RText>
        {Platform.OS === 'web' ? (
          <View style={styles.searchContainer}>
            <PlacesAutocomplete
              onSelect={handleSearchSelect}
              placeholder={'Search by park, city, or trail'}
              style={styles.searchBar}
            />
          </View>
        ) : Platform.OS === 'android' ? (
          <RButton
            style={styles.searchButton}
            onPress={() => {
              router.push('/search');
            }}
          >
            <XStack ai="center" jc="flex-start" f={1} gap="$2">
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={currentTheme.colors.iconColor}
              />
              <RText color={currentTheme.colors.text} opacity={0.6}>
                Search by park, city, or trail
              </RText>
            </XStack>
          </RButton>
        ) : null}
      </RStack>
    </View>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    banner: {
      width: '100%',
      backgroundColor: currentTheme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
    },
    stack: {
      width: '100%',
      alignItems: 'flex-start',
      paddingTop: Platform.OS === 'web' ? 24 : 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left', // Align text to the left
      width: '100%', // Ensure it takes full width for left alignment
    },
    searchContainer: {
      width: '100%',
      alignItems: 'flex-start',
      padding: 2,
    },
    searchBar: {
      width: '100%',
      borderRadius: 5,
      backgroundColor: currentTheme.colors.inputBackground,
      color: currentTheme.colors.text,
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    searchButton: {
      backgroundColor: currentTheme.colors.border,
      minWidth: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
  };
};
