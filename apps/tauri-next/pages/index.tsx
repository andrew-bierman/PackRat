import Dashboard from './dashboard';
import { useSelector } from 'react-redux';
import LandingPage from 'app/components/landing_page';

// export const runtime = 'experimental-edge'

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);
  return <h1>hello</h1>;
  return <>{!user ? <LandingPage /> : <Dashboard />}</>;
}
