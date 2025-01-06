import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';
import { useRouter } from 'app/hooks/router';
interface UseRegisterUserReturn {
  registerUser: (data: any) => void;
}

interface User {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  name: string;
  password: string;
  email: string;
  googleId: string | null;
  code: string | null;
  is_certified_guide: boolean | null;
  favorites?: any[];
  token?: string;
  offlineMaps?: Record<string, any> | null;
}

export const useRegisterUser = (): UseRegisterUserReturn => {
  const { mutateAsync: signUp } = queryTrpc.signUp.useMutation();
  const sessionSignIn = useSessionSignIn();
  const router = useRouter();

  const registerUser: UseRegisterUserReturn['registerUser'] = (data) => {
    signUp(data)
      .then((user: User) => {
        if (!user.token) {
          return router.push('/sign-in');
        }

        sessionSignIn(user);
      })
      .catch(() => {});
  };

  return { registerUser };
};
