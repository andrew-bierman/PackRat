import useTheme from 'app/hooks/useTheme';
import { platform } from 'os';
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
        maxWidth={Platform.OS === 'web' ? 1440 : 400}
        margin="auto"
        alignItems="center"
        justifyContent="flex-start"
        paddingTop={Platform.OS === 'web' ? 20 : '$4'}
        paddingBottom={Platform.OS !== 'web' ? 44 : undefined}
        paddingHorizontal="$4"
        marginBottom={Platform.OS === 'web' ? 20 : '$1'}
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
                  ? ({
                      position: 'absolute',
                      width: '100%',
                      maxWidth: 390,
                      bottom: 10,
                      right: 10,
                      zIndex: 1000,
                    } as any)
                  : ({
                      position: 'fixed',
                      bottom: 20,
                      right: 20,
                    } as any)
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
