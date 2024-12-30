import useTheme from 'app/hooks/useTheme';
import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { ScrollView, Stack, YStack } from 'tamagui';

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: Record<string, any>;
  bottomRightComponent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  bottomRightComponent,
  customStyle = {},
}) => {
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack
        flex={1}
        backgroundColor={currentTheme.colors.background}
        maxWidth={1440}
        margin="auto"
        alignItems="center"
        justifyContent="flex-start"
        paddingTop={Platform.OS === 'web' ? 20 : '$2'}
        paddingBottom={Platform.OS !== 'web' ? 44 : undefined}
        paddingHorizontal="$4"
        marginBottom={Platform.OS === 'web' ? 20 : '$2'}
        width="100%"
        {...customStyle}
      >
        <Stack width="100%">
          <ScrollView contentContainerStyle={{ width: '100%' }}>
            {children}
          </ScrollView>
          {bottomRightComponent && (
            <View
              style={
                Platform.OS !== 'web'
                  ? {
                      position: 'absolute',
                      width: '100%',
                      maxWidth: 390,
                      bottom: 10,
                      right: 10,
                      zIndex: 1000,
                    }
                  : {
                      position: 'fixed',
                      bottom: 20,
                      right: 20,
                    }
              }
            >
              {bottomRightComponent}
            </View>
          )}
        </Stack>
      </YStack>
    </SafeAreaView>
  );
};

export default Layout;
