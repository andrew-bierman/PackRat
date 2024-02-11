import { Slot } from 'expo-router';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <AuthWrapper>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </AuthWrapper>
  );
}
