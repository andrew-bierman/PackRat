import { useSelector } from 'react-redux';

export const useAuthUser = () => {
  const authUser = useSelector((state) => state.auth.user);

  return authUser;
};
