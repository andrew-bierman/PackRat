import { useUserQuery } from '../hooks';

export const AuthLoader = ({
  children,
  loadingElement,
  unauthorizedElement,
}) => {
  const { isLoading, user } = useUserQuery();

  if (isLoading) {
    return loadingElement;
  }

  if (!user) {
    return unauthorizedElement;
  }

  return children;
};
