import React, { type FC } from 'react';
import { View, type ViewProps } from 'tamagui';

interface LayoutCardProps extends ViewProps {}

export const LayoutCard: FC<LayoutCardProps> = ({ style, ...props }) => {
  return (
    <View
      {...props}
      style={[
        {
          border: '1px solid #e5e7eb',
          backgroundColor: 'transparent',
          padding: 24,
          borderRadius: 8,
        },
        style,
      ]}
    />
  );
};
