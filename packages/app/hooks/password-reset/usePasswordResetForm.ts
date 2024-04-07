import axios from 'axios';
import { api } from 'app/constants/api';
import useTheme from 'app/hooks/useTheme';
import { useState } from 'react';
import { InformUser } from 'app/utils/ToastUtils';

export const usePasswordResetForm = ({ token }) => {
  const { currentTheme } = useTheme();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handles the password reset.
   *
   * @return {Promise<void>} - A promise that resolves when the password reset is complete.
   */
  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      // TODO - switch to RTK query
      await axios.post(`${api}/password-reset/${token}`, { password });
      setPassword('');
      setLoading(false);
      InformUser({
        title: 'Password reset successful',
        placement: 'bottom',
        duration: 3000,
        style: {
          backgroundColor: currentTheme.colors.error,
        },
      });
    } catch (error) {
      console.log('Error here', error);
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    loading,
    handlePasswordReset,
  };
};
