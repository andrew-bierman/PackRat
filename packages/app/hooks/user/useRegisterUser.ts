import { useForm, type UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { signUp } from '../../store/authStore';
import { useSession } from '../../context/Auth/SessionProvider';
import { useRouter } from 'app/hooks/router';

WebBrowser.maybeCompleteAuthSession();

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
  const dispatch = useDispatch();
  const { sessionSignIn } = useSession();
  const router = useRouter();
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
      dispatch(signUp({ name, username, email, password })).then(
        ({ payload }) => {
          if (!payload) return;
          if (payload.token) {
            sessionSignIn(payload.token);
            router.push('/');
          }
        },
      );
    } catch (e) {
      console.log('Error', e);
    }
  };

  return { form, registerUser };
};
