import { useUserLoader } from '../hooks';

export const AuthLoader = ({
  children,
  loadingElement,
  unauthorizedElement,
}) => {
  const { user, isLoading } = useUserLoader();
  if (isLoading) {
    return loadingElement;
  }

  if (!user) {
    return unauthorizedElement;
  }

  return children;
};
