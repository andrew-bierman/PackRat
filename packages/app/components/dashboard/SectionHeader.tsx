import React from 'react';
import { RText, RStack } from '@packrat/ui';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface SectionHeaderProps {
  iconName: keyof typeof Ionicons.glyphMap;
  text: string;
}

const SectionHeader = ({ iconName, text }: SectionHeaderProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <RStack style={styles.rStack}>
      <Ionicons name={iconName} style={styles.icon} />
      <RText style={styles.text}>{text}</RText>
    </RStack>
  );
};

const loadStyles = () => ({
  rStack: {
    marginBottom: 10,
    justifyContent: 'space-around', // Updated from "space-between"
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.tertiaryBlue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 40,
    margin: 10,
    color: theme.colors.iconColor,
  },
});

export default SectionHeader;
