import React from 'react';
import { RStack, RText, RButton } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LargeCard from '../card/LargeCard';
import { Platform, View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { useAuthUser } from 'app/auth/hooks';
import Hero from '../hero';
import { useRouter } from 'app/hooks/router';
import { first } from 'lodash';
import { hexToRGBA } from '../../utils/colorFunctions';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';
import { background } from 'native-base/lib/typescript/theme/styled-system';

interface HeroSectionProps {
  onSelect: (selectedResult: SearchResult) => void;
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

const HeroSection: React.FC<HeroSectionProps> = ({ onSelect }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  const handleSearchSelect = async (selectedResult: SearchResult) => {
    try {
      const { osm_id, osm_type, name } = selectedResult.properties;

      // const coordinates = selectedResult.geometry.coordinates;

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

  const user = useAuthUser();

  const firstNameOrUser = first(user?.name?.split(' ')) ?? 'User';

  const cardBackgroundColor = hexToRGBA(currentTheme.colors.secondaryBlue, 0.5);

  const bannerText =
    firstNameOrUser !== 'User'
      ? `Let's find a new trail, ${firstNameOrUser}`
      : "Let's find a new trail";

  return (
    <View style={styles.banner}>
      <Hero
        imageDetails={{
          title: 'N/A',
          subtitle: 'N/A',
          source:
            Platform.OS === 'web'
              ? 'https://github.com/andrew-bierman/PackRat/blob/main/apps/expo/assets/topographical-pattern.png?raw=true'
              : require('app/assets/topographical-pattern.png'),
          alt: 'hero',
        }}
      >
        <LargeCard
          customStyle={{
            backgroundColor:
              cardBackgroundColor || currentTheme.colors.secondaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: 50,
          }}
          title={''}
          type={'search'}
        >
          <RStack
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RText style={styles.title}>{bannerText}</RText>
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
                  color={currentTheme.colors.background}
                />
                <RText color={currentTheme.colors.textDarkGrey} opacity={0.6}>
                  Search by park, city, or trail
                </RText>
              </RButton>
            )}
          </RStack>
        </LargeCard>
      </Hero>
    </View>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    banner: {
      flex: 1,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      marginBottom: 20,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: currentTheme.colors.text,
    },
  };
};

export default HeroSection;
