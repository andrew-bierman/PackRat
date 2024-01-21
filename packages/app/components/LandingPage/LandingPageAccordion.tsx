import { View } from 'react-native';
import { RButton, RCard, RText, RStack } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useState } from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';

export const LandingPageAccordion = ({ title, content, iconName }) => {
  const styles = useCustomStyles(loadStyles);
  const [expanded, toggleExpanded] = useAccordionState();

  return (
    <RCard style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <RText style={styles.featureText}>{title}</RText>
        </View>
        <RButton
          backgroundColor="transparent"
          style={styles.transparentButton}
          onPress={toggleExpanded}
        >
          <MaterialIcons
            name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            style={styles.icon}
          />
        </RButton>
      </View>
      {expanded && (
        <RCard.Header>
          <RText style={styles.cardContent}>{content}</RText>
        </RCard.Header>
      )}
    </RCard>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    card: {
      marginBottom: 10,
      width: '100%',
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    transparentButton: {
      backgroundColor: 'transparent',
    },
    icon: {
      fontSize: 28,
      color: '#34a89a',
      marginRight: 10,
    },
    featureText: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: currentTheme.colors.text,
    },
  };
};

const useAccordionState = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prevState) => !prevState);

  return [expanded, toggleExpanded];
};
