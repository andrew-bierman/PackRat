import Dashboard from './dashboard';
import LandingPage from 'app/components/landing_page';
import { useAuthUser } from 'app/auth/hooks';

import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

// export const runtime = 'experimental-edge'

export default function Home() {
  const user = useAuthUser();
  return <>{!user ? <LandingPage /> : <Dashboard />}</>;
}
