import { View } from 'react-native';
import { Card } from 'native-base';
import React from 'react';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const Section = ({ children, onPress }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.section} onPress={onPress}>
      <Card style={styles.card}>{children}</Card>
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
