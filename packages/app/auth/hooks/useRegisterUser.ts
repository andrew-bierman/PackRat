import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';

interface UseRegisterUserReturn {
  registerUser: (data: any) => void;
}

export const useRegisterUser = (): UseRegisterUserReturn => {
  const { mutateAsync: signUp } = queryTrpc.signUp.useMutation();
  const sessionSignIn = useSessionSignIn();

  const registerUser: UseRegisterUserReturn['registerUser'] = (data) => {
    try {
      signUp(data).then((user) => {
        sessionSignIn(user);
      });
    } catch (e) {
      console.log('Error', e);
    }
  };

  return { registerUser };
};
