import { GestureResponderEvent, View } from 'react-native';
import { RCard } from '@packrat/ui';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TouchableOpacity } from 'react-native';
import { useScreenWidth } from 'app/hooks/common';
import { SCREEN_WIDTH } from 'app/constants/breakpoint';

interface SectionProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}
const Section: React.FC<SectionProps> = ({ children, onPress }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity style={styles.section} onPress={onPress}>
      {/* <View style={styles.section} onPress={onPress}> */}
      <RCard style={{ borderRadius: 8 }}>
        <RCard.Header style={styles.card}>{children}</RCard.Header>
      </RCard>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const { screenWidth } = useScreenWidth();
  return {
    section: {
      marginBottom: 20,
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth <= SCREEN_WIDTH ? '90vw' : '58vw',
      backgroundColor: currentTheme.colors.secondaryBlue,
      borderRadius: 8,
    },
  };
};
export default Section;
