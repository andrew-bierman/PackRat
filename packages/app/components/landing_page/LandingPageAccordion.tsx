import { View } from 'react-native';
import { RButton as OriginalRButton, RCard, RText } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAccordionState from './useAccordionState';
import loadStyles from './landingpage.style';

const RButton: any = OriginalRButton;

export const LandingPageAccordion = ({ title, content, iconName }) => {
  const styles = useCustomStyles(loadStyles);
  // const [expanded, toggleExpanded] = useAccordionState();

  return (
    <RCard style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <RText style={styles.featureText}>{title}</RText>
        <RText style={styles.cardContent}>{content}</RText>
      </View>
      
    </RCard>
  );
};
