import { View, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import React from 'react';
import { theme } from '../../theme';
import UseTheme from '../../hooks/useTheme';

const Section = ({ children, onPress }) => {
  return (
    <View style={styles().section} onPress={onPress}>
      <Card style={styles().card}>{children}</Card>
    </View>
  );
};

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  return StyleSheet.create({
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
  });
};
export default Section;
