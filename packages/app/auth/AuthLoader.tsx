import { useUserQuery } from './hooks';

export const AuthLoader = ({
  children,
  loadingElement,
  unauthorizedElement,
}) => {
  const { user, isLoading } = useUserQuery();

  if (isLoading) {
    return loadingElement;
  }

  if (!isLoading && !user) {
    return unauthorizedElement;
  }

  return children;
};
