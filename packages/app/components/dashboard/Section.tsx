import { GestureResponderEvent, View } from 'react-native';
import { RCard } from '@packrat/ui';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TouchableOpacity } from 'react-native';

interface SectionProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}
const Section: React.FC<SectionProps> = ({ children, onPress }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <View style={styles.section}>
      <RCard style={{ borderRadius: 8 }}>
        <RCard.Header style={styles.card}>{children}</RCard.Header>
      </RCard>
    </View>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    section: {
      marginBottom: 20,
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 8,
      backgroundColor: currentTheme.colors.border,
    },
  };
};
export default Section;
