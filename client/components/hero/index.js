import React from 'react';
import { VStack, Text, Image } from 'native-base';
import LargeCard from '../card/LargeCard';
import { Platform, View } from 'react-native';
import { theme } from '../../theme';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import useCustomStyles from '~/hooks/useCustomStyles';

const Hero = ({ children, imageDetails }) => {
  if (isObjectEmpty(imageDetails || {})) {
    imageDetails = {
      title: 'N/A',
      subtitle: 'N/A',
      source: require('../../assets/topographical-pattern.jpg'),
      alt: 'hero',
    };
  }

  const { title, subtitle, source, alt } = imageDetails;
  const styles = useCustomStyles(loadStyles);

  return (
    <View
      style={[
        styles.heroContainer,
        Platform.OS === 'web' ? { height: '310px' } : null,
      ]}
    >
      <Image source={source} alt={alt} style={styles.heroImage} />
      <VStack>{children}</VStack>
    </View>
  );
};

const loadStyles = () => ({
  heroContainer: {
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',

    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
    position: 'absolute',
  },
});

export default Hero;
