import { Stack } from 'expo-router';
import { useSession } from 'app/context/Auth/SessionProvider';
import { useProtectedRoute } from 'app/hooks/auth/useProtectedRoute';

export default function AppLayout() {
  const { session } = useSession();
  useProtectedRoute(session);
  return <Stack />;
}
