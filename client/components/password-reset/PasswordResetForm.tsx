// frontend/components/PasswordResetForm.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text, Toast } from 'native-base';

import useCustomStyles from '~/hooks/useCustomStyles';
import { usePasswordReset } from '~/hooks/password-reset/usePasswordReset';

export const PasswordResetForm = ({ token }) => {
  const styles = useCustomStyles(loadStyles);
  const { password, setPassword, loading, handlePasswordReset } =
    usePasswordReset(token);

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
        // block
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
