import { TouchableOpacity, Text } from 'react-native';
import { RCard as OriginalRCard } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../theme';
import useCustomStyles from 'app/hooks/useCustomStyles';

const RCard: any = OriginalRCard;

interface QuickActionButtonProps {
  onPress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
}

const QuickActionButton = ({
  onPress,
  iconName,
  text,
}: QuickActionButtonProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RCard elevate style={styles.card}>
        <RCard.Header padded alignItems="center">
          <MaterialIcons name={iconName} size={24} style={styles.icon} />
          <Text style={styles.text}>{text}</Text>
        </RCard.Header>
      </RCard>
    </TouchableOpacity>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    container: {
      margin: 10,
      display: 'flex',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.colors.card,
      elevation: 0,
      boxShadow: 'unset',
    },
    icon: {
      marginBottom: 10,
      color: currentTheme.colors.iconColor,
    },
    text: {
      fontSize: 13,
      fontWeight: 'bold',
      color: currentTheme.colors.tertiaryBlue,
    },
  };
};

export default QuickActionButton;
