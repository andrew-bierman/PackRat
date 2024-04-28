import Dashboard from './dashboard';
import LandingPage from 'app/components/landing_page';
import { useAuthUser } from 'app/auth/hooks';

// export const runtime = 'experimental-edge'

export default function Home() {
  const user = useAuthUser();

  
  return <>{!user ? <LandingPage /> : <Dashboard />}</>;
}
