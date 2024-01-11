import { View } from 'react-native';
import { RCard } from '@packrat/ui';
import React from 'react';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const Section = ({ children, onPress }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.section} onPress={onPress}>
      <RCard style={{ borderRadius: '8px' }}>
        <RCard.Header style={styles.card}>{children}</RCard.Header>
      </RCard>
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
      borderRadius: '8px',
    },
  };
};
export default Section;
