import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { View, Text } from 'react-native';

interface SidebarProps {
  data: Array<{ title?: string; subtext?: string }>;
  currentStep: number;
}

// /TODO: Review this logic.
export const Sidebar: React.FC<SidebarProps> = ({ data, currentStep }) => {
  const displayData = Object.values(data).slice(0, currentStep + 1);
  const styles = useCustomStyles(loadStyles);

  if (displayData.length === 0) return null;

  return (
    <View style={styles.sidebar}>
      {displayData.map((currentData, index) => {
        if (!currentData) return null;
        const { title, subtext } = currentData;

        return (
          <View key={index}>
            {title && <Text>{title}</Text>}
            {subtext && <Text>{subtext}</Text>}
          </View>
        );
      })}
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    sidebar: {
      width: '20%',
      padding: 10,
      backgroundColor: currentTheme.colors.white,
    },
  };
};
