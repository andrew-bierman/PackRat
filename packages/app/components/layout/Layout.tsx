import useTheme from 'app/hooks/useTheme';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const Layout = ({
  children,
  customStyle = {},
}: {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}) => {
  const { currentTheme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            paddingBottom: Platform.OS !== 'web' ? 44 : undefined,
            paddingHorizontal: 16,
            marginBottom: 20,
            alignItems: 'center',
            width: '100%',
          },
          customStyle,
        ]}
      >
        <View style={{ width: '100%' }}>
          <ScrollView contentContainerStyle={{ width: '100%' }}>
            {children}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Layout;
