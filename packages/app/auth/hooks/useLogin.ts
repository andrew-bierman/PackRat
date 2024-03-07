import { useForm, type UseFormReturn } from 'react-hook-form';
import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';

interface UserForm {
  email: string;
  password: string;
}

interface UseLoginReturn {
  handleLogin: (data: UserForm) => void;
  hasError: boolean;
}

export const useLogin = (): UseLoginReturn => {
  const { mutateAsync: signIn, error } = queryTrpc.signIn.useMutation();
  const sessionSignIn = useSessionSignIn();

  const handleLogin: UseLoginReturn['handleLogin'] = (data) => {
    const { email, password } = data;
    signIn({ email, password }).then((user) => {
      sessionSignIn(user);
    });
  };

  return { handleLogin, hasError: !!error };
};
