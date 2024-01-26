// useProtectedRoute.native.js
import React, { useEffect } from 'react';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useSession } from 'app/context/Auth/SessionProvider';

export function useProtectedRoute() {
  const { session } = useSession();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      const inAuthGroup = segments[0] === '(auth)';
      if (!session && !inAuthGroup) {
        router.replace('/sign-in');
      } else if (session && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [session, segments, navigationState, router]);
}
