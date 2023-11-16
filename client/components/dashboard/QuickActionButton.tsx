import { TouchableOpacity, Text } from 'react-native';
import { Card } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

import {RCard, RText } from '@packrat/ui';

const QuickActionButton = ({ onPress, iconName, text }) => {
  const styles = useCustomStyles(loadStyles); 
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RCard jc='center' ai='center' px={10} py={20} bg={currentTheme.colors.primary}>
        <MaterialIcons
          name={iconName}
          size={24}
          color={theme.colors.iconColor}
          style={styles.icon}
        />
        <RText fos={12} col={currentTheme.colors.iconColor}>{text}</RText>
      </RCard>
    </TouchableOpacity>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      marginRight: 10,
    },
    icon: {
      marginBottom: 10,
    },
  };
};

export default QuickActionButton;
