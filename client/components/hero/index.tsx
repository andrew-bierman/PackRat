import React from 'react';
import { RStack, RImage } from '@packrat/ui';
import { Platform, View } from 'react-native';
import { theme } from '../../theme';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import useCustomStyles from '~/hooks/useCustomStyles';
import useHero from '~/hooks/hero';

const Hero = ({ children, imageDetails }) => {
  const styles = useCustomStyles(loadStyles);
  const { source, alt } = useHero({ imageDetails });

  return (
    <View
      style={[
        styles.heroContainer,
        Platform.OS === 'web' ? { height: 310 } : null,
      ]}
    >
      <RImage source={source} alt={alt} style={styles.heroImage} />
      <RStack>{children}</RStack>
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
