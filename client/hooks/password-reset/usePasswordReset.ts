import { useState } from 'react';
import { useSearchParams } from 'expo-router';
import axios from '~/config/axios';
import { api } from '../../constants/api';
import { InformUser } from '../../utils/ToastUtils';
import useTheme from '../../hooks/useTheme';

export const usePasswordReset = (token) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      // TODO - switch to RTK query
      await axios.post(`${api}/password-reset/${token}`, { password });
      setPassword('');
      setLoading(false);
      InformUser({
        title: 'Password reset successful',
        placement: 'top-right',
        duration: 3000,
        style: {
          backgroundColor: currentTheme.colors.error,
        },
      });
    } catch (error) {
      console.log('Error here', error);
      setLoading(false);
      InformUser({
        title: 'Error resetting password',
        placement: 'top-right',
        duration: 5000,
        style: {
          backgroundColor: currentTheme.colors.error,
        },
      });
    }
  };
  return {
    password,
    setPassword,
    loading,
    handlePasswordReset,
  };
};
