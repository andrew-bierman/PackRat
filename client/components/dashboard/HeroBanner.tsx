import React from 'react';
import { Box, VStack, Text, Image } from 'native-base';
import LargeCard from '../card/LargeCard';
import { SearchInput } from '../SearchInput';
import { View } from 'react-native';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../hero';
import { useRouter } from 'expo-router';
import {
  photonDetails,
  processGeoJSON,
  setSelectedSearchResult,
} from '../../store/destinationStore';
import { hexToRGBA } from '../../utils/colorFunctions';
import useCustomStyles from '~/hooks/useCustomStyles';

const HeroSection = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  const currentDestination = useSelector(
    (state) => state.destination.currentDestination,
  );

  /**
   * Handles the selection of a search result.
   *
   * @param {Object} selectedResult - The selected search result
   * @return {void}
   */
  const handleSearchSelect = async (selectedResult) => {
    try {
      // Set the selected search result in the Redux store
      dispatch(setSelectedSearchResult(selectedResult));

      const { osm_id, osm_type } = selectedResult.properties;

      const coordinates = selectedResult.geometry.coordinates;

      const [lon, lat] = coordinates;

      if (!osm_id || !osm_type) {
        console.error(
          'No OSM ID or OSM type found in the selected search result',
        );
      } else {
        router.push({
          pathname: '/destination/query',
          params: {
            type: osm_type,
            id: osm_id,
            // lat,
            // lon,
          },
        });
      }
    } catch (error) {
      console.error('errorrrrrr', error);
    }
  };

  const user = useSelector((state) => state.auth?.user);

  const firstNameOrUser =
    (user && user.name && user.name.split(' ')[0]) || 'User';

  // const cardBackgroundColor = hexToRGBA(currentTheme.colors.secondaryBlue, 0.5);

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
          source: require('../../assets/topographical-pattern.png'),
          alt: 'hero',
        }}
      >
        <LargeCard
          customStyle={{
            backgroundColor: currentTheme.colors.secondaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: 50,
          }}
        >
          <VStack
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.title}>{bannerText}</Text>
            <SearchInput
              onSelect={handleSearchSelect}
              placeholder={'Search by park, city, or trail'}
            />
          </VStack>
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
