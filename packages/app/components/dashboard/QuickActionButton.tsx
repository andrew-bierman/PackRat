import { TouchableOpacity, Text } from 'react-native';
import { RCard as OriginalRCard } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../theme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useScreenWidth } from 'app/hooks/common';

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
          <MaterialIcons
            name={iconName}
            size={24}
            color={theme.colors.iconColor}
            style={styles.icon}
          />
          <Text style={styles.text}>{text}</Text>
        </RCard.Header>
      </RCard>
    </TouchableOpacity>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  const {screenWidth} = useScreenWidth();
  return {
    container: {
      margin: 10,
      width: screenWidth <= 425 ? '15vw':'10vw',
      height:'10vh',
    },
    card: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth <= 425 ? '15vw':'10vw',
      height:'10vh',
      // paddingHorizontal: 40,
      // paddingVertical: 60,
      backgroundColor: currentTheme.colors.primary,
    },
    icon: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      color: currentTheme.colors.iconColor,
    },
  };
};

export default QuickActionButton;
