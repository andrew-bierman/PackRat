import { useForm, type UseFormReturn } from 'react-hook-form';
import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';

interface RegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface UseRegisterUserReturn {
  form: UseFormReturn<RegisterForm>;
  registerUser: (data: RegisterForm) => void;
}

export const useRegisterUser = (): UseRegisterUserReturn => {
  const { mutateAsync: signUp } = queryTrpc.signUp.useMutation();
  const sessionSignIn = useSessionSignIn();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  });

  const registerUser: UseRegisterUserReturn['registerUser'] = (data) => {
    const { name, username, email, password } = data;
    try {
      const alphanumeric = /^[a-zA-Z0-9]+$/;
      if (!alphanumeric.test(username)) {
        alert('Username should be alphanumeric');
        return;
      }
      signUp({ name, username, email, password }).then((user) => {
        sessionSignIn(user);
      });
    } catch (e) {}
  };

  return { form, registerUser };
};
