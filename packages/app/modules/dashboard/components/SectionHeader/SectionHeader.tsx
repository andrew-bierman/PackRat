import React from 'react';
import { RText, RStack, RButton } from '@packrat/ui';
import { type Ionicons } from '@expo/vector-icons';
import { useNavigate } from 'app/hooks/navigation';
import { theme } from 'app/theme';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface SectionHeaderProps {
  iconName: keyof typeof Ionicons.glyphMap;
  text: string;
  textStyle: any;
}

export const SectionHeader = ({
  iconName,
  text,
  textStyle,
}: SectionHeaderProps) => {
  const styles = useCustomStyles(loadStyles);
  const navigate = useNavigate();

  return (
    <RStack style={styles.rStack}>
      <RText style={styles.text}>{text}</RText>
      <RButton style={styles.rbutton} onPress={() => navigate('/feed')}>
        0 View all feeds
      </RButton>
    </RStack>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    rStack: {
      marginBottom: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    text: {
      color: currentTheme.colors.tertiaryBlue,
      fontSize: 25,
      fontWeight: 'bold',
    },
    icon: {
      fontSize: 40,
      margin: 10,
      color: currentTheme.colors.iconColor,
    },
    rbutton: {
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
    },
  };
};
