import { useAuthUserToken } from './hooks';

export const AuthLoader = ({
  children,
  loadingElement,
  unauthorizedElement,
}) => {
  const { token, isLoading } = useAuthUserToken();

  if (isLoading) {
    return loadingElement;
  }

  if (!token) {
    return unauthorizedElement;
  }

  return children;
};
