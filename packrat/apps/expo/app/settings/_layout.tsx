import { HeaderBackButton } from '@react-navigation/elements'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'

export default function Layout() {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          // for some reason, the back button appears on android but not ios - temporary fix:
          headerLeft:
            Platform.OS === 'ios'
              ? () => <HeaderBackButton onPress={() => router.back()} label="Back" />
              : undefined,
        }}
      />
      <Stack.Screen
        name="general"
        options={{
          title: 'General',
        }}
      />
      <Stack.Screen
        name="change-email"
        options={{
          title: 'Change Email',
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: 'Change Password',
        }}
      />
    </Stack>
  )
}
