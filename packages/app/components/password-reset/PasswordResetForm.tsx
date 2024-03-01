// frontend/components/PasswordResetForm.js
import React from 'react';
import { View } from 'react-native';
import { RButton, RInput, RText } from '@packrat/ui';
import axios from 'app/config/axios';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { usePasswordResetForm } from 'app/hooks/password-reset';

export const PasswordResetForm = ({ token }: { token: string }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const { password, setPassword, loading, handlePasswordReset } =
    usePasswordResetForm({ token });

  return (
    <View style={styles.container}>
      <RInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <RButton
        block
        style={styles.button}
        onPress={handlePasswordReset}
        disabled={!password || loading}
      >
        <RText>{loading ? 'Loading...' : 'Reset Password'}</RText>
      </RButton>
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
