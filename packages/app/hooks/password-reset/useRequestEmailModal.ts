import useTheme from 'app/hooks/useTheme';
import { toast } from 'app/utils/ToastUtils';
import { queryTrpc } from 'app/trpc';

export const useRequestEmailModal = () => {
  const { currentTheme } = useTheme();
  const { mutateAsync: requestResetPassword, isLoading: loading } =
    queryTrpc.resetPasswordEmail.useMutation();

  /**
   * Initiates the password reset process by calling the API.
   *
   * @return {Promise<void>} A promise that resolves when the password reset email is sent successfully.
   */
  const handleResetPasswordEmail = async (closeModal, { email }) => {
    try {
      await requestResetPassword({ email });
      // Call your API to initiate the password reset process
      // Pass the email entered by the user to the API endpoint
      // The API endpoint should send an email with a reset link to the provided email
      // TODO - switch to RTK query
      // await axios.post(`${api}/password-reset`, { email });
      closeModal();

      toast({
        title: 'Password reset email sent',
        duration: 3,
        preset: 'done',
      });
    } catch (error) {}
  };

  return {
    loading,
    handleResetPasswordEmail,
  };
};
