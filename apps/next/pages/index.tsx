import Dashboard from './dashboard';
import { useSelector } from 'react-redux';
import LandingPage from 'app/components/landing_page';

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);
  return <>
    {!user ? <LandingPage /> : <Dashboard />}
  </>
}
