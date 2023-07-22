import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'
// import { LogBox } from 'react-native'

// LogBox.ignoreAllLogs()

SplashScreen.preventAutoHideAsync()

export default function HomeLayout() {
  const [fontLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontLoaded])

  if (!fontLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="create"
            options={{
              title: 'New Project',
              headerShown: true,
            }}
          />
        </Stack>
      </Provider>
    </View>
  )
}
