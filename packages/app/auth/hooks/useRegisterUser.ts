import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';
import { getErrorMessageFromError } from 'app/utils/apiUtils';

interface UseRegisterUserReturn {
  registerUser: (data: any) => void;
}

export const useRegisterUser = (): UseRegisterUserReturn => {
  const { mutateAsync: signUp } = queryTrpc.signUp.useMutation();
  const sessionSignIn = useSessionSignIn();

  const registerUser: UseRegisterUserReturn['registerUser'] = (data) => {
    signUp(data)
      .then((user) => {
        sessionSignIn(user);
      })
      .catch(() => {});
  };

  return { registerUser };
};
