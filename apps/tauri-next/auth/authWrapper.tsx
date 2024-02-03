import { useSession } from 'app/context/Auth/SessionProvider';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useProtectedRoute from 'app/hooks/auth/useProtectedRoute/useProtectedRoute.web';
import { useEffect, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const loading = useProtectedRoute();
  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
};
