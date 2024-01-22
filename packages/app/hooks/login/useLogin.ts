import { useForm, type UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { signIn } from '../../store/authStore';
import { useSession } from '../../context/Auth/SessionProvider';
import { useRouter } from 'app/hooks/router';

WebBrowser.maybeCompleteAuthSession();

interface UserForm {
  email: string;
  password: string;
}

interface UseLoginReturn {
  form: UseFormReturn<UserForm>;
  handleLogin: (data: UserForm) => void;
  hasError: boolean;
}

export const useLogin = (): UseLoginReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sessionSignIn } = useSession();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const error = useSelector((state) => state.auth.error);

  const handleLogin: UseLoginReturn['handleLogin'] = (data) => {
    const { email, password } = data;
    dispatch(signIn({ email, password })).then(({ payload }) => {
      if (!payload) return;
      if (payload.token) {
        router.push('/');
        sessionSignIn(payload.token);
      }
    });
  };

  return { form, handleLogin, hasError: !!error };
};
