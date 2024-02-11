import React from 'react';
import { RStack, RText } from '@packrat/ui';
import LargeCard from '../card/LargeCard';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { useAuthUser } from 'app/auth/hooks';
import Hero from '../hero';
import { useRouter } from 'app/hooks/router';
import { first } from 'lodash';
import { hexToRGBA } from '../../utils/colorFunctions';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';

const HeroSection = ({ onSelect }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  /**
   * Handles the selection of a search result.
   *
   * @param {Object} selectedResult - The selected search result
   * @return {void}
   */
  const handleSearchSelect = (selectedResult) => {
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

  const user = useAuthUser();

  const firstNameOrUser = first(user?.name?.split(' ')) ?? 'User';

  const cardBackgroundColor = hexToRGBA(currentTheme.colors.secondaryBlue, 0.5);

  const bannerText =
    firstNameOrUser !== 'User'
      ? `Let's find a new trail, ${firstNameOrUser}`
      : "Let's find a new trail";

  // console.log("cardBackgroundColor", cardBackgroundColor)

  return (
    <View style={styles.banner}>
      <Hero
        imageDetails={{
          title: 'N/A',
          subtitle: 'N/A',
          source:
            'https://github.com/andrew-bierman/PackRat/blob/main/apps/expo/assets/topographical-pattern.jpg?raw=true',
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
            <PlacesAutocomplete
              onSelect={handleSearchSelect}
              placeholder={'Search by park, city, or trail'}
            />
          </RStack>
        </LargeCard>
      </Hero>
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    banner: {
      flex: 1,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      marginBottom: 20,
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
