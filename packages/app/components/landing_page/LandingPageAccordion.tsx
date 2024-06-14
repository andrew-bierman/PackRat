import { View } from 'react-native';
import { RButton as OriginalRButton, RCard, RText } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAccordionState from './useAccordionState';
import loadStyles from './landingpage.style';

const RButton: any = OriginalRButton;

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
