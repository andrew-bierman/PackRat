import { Link, Slot } from 'expo-router';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchProvider } from 'app/components/feed/SearchProvider';

export default function AppLayout() {
  return (
    <AuthWrapper>
      <SearchProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              headerShown: true,
              headerRight: () => (
                <Link href="../">
                  <MaterialCommunityIcons name="close" size={24} color="black" />
                </Link>
              ),
              presentation: 'modal',
            }}
          />
        </Stack>
      </SearchProvider>
    </AuthWrapper>
  );
}
