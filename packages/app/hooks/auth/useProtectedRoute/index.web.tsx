// useProtectedRoute.web.js
import { useRouter } from 'next/router';
import { useSession } from 'app/context/Auth/SessionProvider';
import { useEffect } from 'react';

export function useProtectedRoute() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;

    const authGroup = [
      '/login',
      '/auth',
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
    ];

    const inAuthGroup = authGroup.some((group) => path.startsWith(group));

    if (!session && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (session && inAuthGroup) {
      router.replace('/');
    }
  }, [session, router]);
}
