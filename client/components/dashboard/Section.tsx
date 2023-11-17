import { View } from 'react-native';
import { Card } from 'native-base';
import React from 'react';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import { RCard } from '@packrat/ui';

const Section = ({ children, onPress }) => {
  const styles = useCustomStyles(loadStyles);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = useTheme();
  return (
    <View style={styles.section} onPress={onPress}>
      <RCard jc='center' ai='center' px={10} py={20} bg={currentTheme.colors.secondaryBlue}>{children}</RCard>
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    section: {
      marginBottom: 20,
      paddingHorizontal: 20, // Added padding here.
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
  };
};
export default Section;
