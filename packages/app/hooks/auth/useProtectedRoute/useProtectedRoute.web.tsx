// useProtectedRoute.web.js
import { useRouter } from 'next/router';
import { useSession } from 'app/context/Auth/SessionProvider';
import { useEffect, useState } from 'react';

export default function useProtectedRoute() {
  const { session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
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
      router.replace('/sign-in').then(() => setIsLoading(false));
    } else if (session && inAuthGroup) {
      router.replace('/').then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  return isLoading;
}
