// frontend/components/PasswordResetForm.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text, Toast } from 'native-base';
import { useSearchParams } from 'expo-router';
import axios from '~/config/axios';
import useTheme from '../../hooks/useTheme';
import { api } from '../../constants/api';
import { InformUser } from '../../utils/ToastUtils';
import useCustomStyles from '~/hooks/useCustomStyles';

export const PasswordResetForm = ({ token }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const { token } = useSearchParams();

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

  return (
    <View style={styles.container}>
      <Input
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <Button
        block
        style={styles.button}
        onPress={handlePasswordReset}
        disabled={!password || loading}
      >
        <Text>{loading ? 'Loading...' : 'Reset Password'}</Text>
      </Button>
    </View>
  );
};

const loadStyles = () => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
});
