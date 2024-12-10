import useTheme from 'app/hooks/useTheme';
import React from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

const Layout = ({
  children,
  customStyle = {},
}: {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}) => {
  const { currentTheme } = useTheme();
  return (
    <View
      style={[
        {
          display: 'flex',
          backgroundColor: currentTheme.colors.background,
          flex: 1,
          maxWidth: 1440,
          margin: 'auto',
          justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
          paddingTop: 20,
          paddingHorizontal: 16,
          marginBottom: 20,
          alignItems: 'center',
          width: '100%',
        },
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default Layout;
