import axios from 'axios';
import { api } from 'app/constants/api';
import useTheme from 'app/hooks/useTheme';
import { useState } from 'react';
import { InformUser } from 'app/utils/ToastUtils';

export const useRequestEmailModal = () => {
  const { currentTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Initiates the password reset process by calling the API.
   *
   * @return {Promise<void>} A promise that resolves when the password reset email is sent successfully.
   */
  const handleResetPasswordEmail = async (_, closeModal) => {
    try {
      setLoading(true);
      // Call your API to initiate the password reset process
      // Pass the email entered by the user to the API endpoint
      // The API endpoint should send an email with a reset link to the provided email
      // TODO - switch to RTK query
      await axios.post(`${api}/password-reset`, { email });
      setLoading(false);
      closeModal();
      InformUser({
        title: 'Password reset email sent',
        style: { backgroundColor: currentTheme.colors.textPrimary },
        placement: 'top-right',
        duration: 5000,
      });
    } catch (error) {
      setLoading(false);
      InformUser({
        title: error?.response?.data?.error,
        duration: 7000,
        placement: 'top-right',
        style: { backgroundColor: currentTheme.colors.error },
      });
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleResetPasswordEmail,
  };
};
