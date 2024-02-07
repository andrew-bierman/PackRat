import { useSession } from 'app/context/Auth/SessionProvider';
import { useProtectedRoute } from 'app/hooks/auth/useProtectedRoute';
import { Navigation } from 'app/components/navigation';

export default function AppLayout() {
  const { session } = useSession();
  useProtectedRoute(session);
  return <Navigation />;
}
