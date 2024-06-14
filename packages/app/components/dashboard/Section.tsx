import { GestureResponderEvent, View } from 'react-native';
import { RCard } from '@packrat/ui';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TouchableOpacity } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';


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
  const { xs, xxxs, xxs, } =  useResponsive();
  return {
    section: {
      marginBottom: 20,
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      width: xxxs ? '90vw' : xxs ? '90vw' : xs ? '92vw': '88vw',
      backgroundColor: currentTheme.colors.secondaryBlue,
      borderRadius: 8,
    },
  };
};
export default Section;
