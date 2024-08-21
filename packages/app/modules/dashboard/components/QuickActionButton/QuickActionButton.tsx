import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface QuickActionButtonProps {
  onPress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
}

export const QuickActionButton = ({
  onPress,
  iconName,
  text,
}: QuickActionButtonProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name={iconName} size={24} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: currentTheme.colors.border,
      borderRadius: 5,
      margin: 5,
    },
    icon: {
      marginRight: 10,
      color: currentTheme.colors.text,
    },
    text: {
      fontSize: 13,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
  };
};
