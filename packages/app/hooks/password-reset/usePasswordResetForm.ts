import useTheme from 'app/hooks/useTheme';
import { useState } from 'react';
import { queryTrpc } from 'app/trpc';
import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ token: string }>();

export const usePasswordResetForm = () => {
  const { mutateAsync: resetPassword, isLoading: loading } =
    queryTrpc.resetPassword.useMutation();
  const [resetToken] = useParam('token');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  /**
   * Handles the password reset.
   *
   * @return {Promise<void>} - A promise that resolves when the password reset is complete.
   */
  const handlePasswordReset = async ({ password }) => {
    try {
      await resetPassword({ password, resetToken });
      setIsPasswordUpdated(true);
    } catch (error) {
      
    }
  };

  return {
    resetToken,
    loading,
    handlePasswordReset,
    isPasswordUpdated,
  };
};
