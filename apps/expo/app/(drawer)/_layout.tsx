import { Redirect, Stack } from 'expo-router';
import { AuthLoader } from 'app/auth/AuthLoader';
import { Text } from '@packrat/ui';

export default function AppLayout() {
  return (
    <AuthLoader
      loadingElement={<Text>Loading</Text>}
      unauthorizedElement={<Redirect href="/sign-in" />}
    >
      <Stack />
    </AuthLoader>
  );
}
