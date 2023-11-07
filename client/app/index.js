import { useSelector } from 'react-redux';
import { useRouter, useRootNavigationState } from 'expo-router';
import LandingPage from '../components/landing_page';
import Navigation from '../screens/Navigation';
import { Platform } from 'react-native';

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const user = useSelector((state) => state.auth.user);
  if (!navigationState?.key) return null;
  const isWeb = Platform.OS === 'web';
  if (!user) {
    return router.replace('/onboarding');
    // return (
    //   <>
    //     {!isWeb && <Navigation />}
    //     <LandingPage />
    //   </>
    // );
  }
  return router.replace('/home');
}
