import React from 'react';
import { RStack, RImage } from '@packrat/ui';
import { ImageSourcePropType, Platform, View } from 'react-native';
import { theme } from '../../theme';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './hero.style';

interface HeroProps {
  children: React.JSX.Element;
  imageDetails: {
    title: string;
    subtitle: string;
    source: ImageSourcePropType;
    alt: string;
  };
}

const Hero = ({ children, imageDetails }: HeroProps) => {
  if (isObjectEmpty(imageDetails || {})) {
    imageDetails = {
      title: 'N/A',
      subtitle: 'N/A',
      source:
        'https://github.com/andrew-bierman/PackRat/blob/main/apps/expo/assets/topographical-pattern.jpg?raw=true',
      alt: 'hero',
    };
  }

  const { title, subtitle, source, alt } = imageDetails;
  const styles = useCustomStyles(loadStyles);

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

export default Hero;
