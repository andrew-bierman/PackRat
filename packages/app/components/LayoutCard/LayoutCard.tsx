import React, { type FC } from 'react';
import { View, type ViewProps } from 'tamagui';
import useTheme from 'app/hooks/useTheme';

interface LayoutCardProps extends ViewProps {}

export const LayoutCard: FC<LayoutCardProps> = ({ style, ...props }) => {
  const { currentTheme } = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: currentTheme.colors.card,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          padding: 24,
          borderRadius: 8,
        },
        style,
      ]}
    />
  );
};
