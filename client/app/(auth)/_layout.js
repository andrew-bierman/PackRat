import { Stack } from 'expo-router';
import { useProtectedRoute, useSession } from '../../context/auth';

export default function AppLayout() {
  const { session } = useSession();
  useProtectedRoute(session);
  return <Stack />;
}
