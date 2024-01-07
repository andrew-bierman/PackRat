import { useDispatch } from 'react-redux';
import { useSession } from '../../context/auth';
import { signOut } from '../../store/authStore';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { sessionSignOut } = useSession();

  const logout = () => {
    dispatch(signOut());
    sessionSignOut();
  };

  return logout;
};
