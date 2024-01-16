import { Stack } from 'expo-router';
import { useProtectedRoute, useSession } from 'app/context/auth';

export default function AppLayout() {
  const { session } = useSession();
  useProtectedRoute(session);
  return <Stack />;
}
