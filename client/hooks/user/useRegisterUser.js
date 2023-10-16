import { queryTrpc } from '../../trpc';
import { useSession } from '../../context/auth';

export const useRegisterUser = () => {

  const mutation = queryTrpc.signUp.useMutation({
    onSuccess: (result) => {
      console.log('success');
      console.log(result);

    },
  });

  return {
    mutation,
    registerNewUser: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
