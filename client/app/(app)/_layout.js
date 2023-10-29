import { Platform } from 'react-native';
import { Stack, Slot } from 'expo-router';
import { useProtectedRoute, useSession } from '../../context/auth';

export default function AppLayout() {
  const { session } = useSession();
  useProtectedRoute(session);
  return Platform.OS === 'web' ? <Stack /> : <Slot />;
}
