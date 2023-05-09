import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text, Toast } from 'native-base';
import axios from 'axios';
import { api } from '../../constants/api';

export const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      // Call your API to initiate the password reset process
      // Pass the email entered by the user to the API endpoint
      // The API endpoint should send an email with a reset link to the provided email
      await axios.post(`${api}/password-reset`, { email });
      setLoading(false);
      Toast.show({
        text: 'Password reset email sent',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        text: 'Error sending password reset email',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Button
        block
        style={styles.button}
        onPress={handleResetPassword}
        disabled={!email || loading}
      >
        <Text>{loading ? 'Loading...' : 'Request Password Reset Email'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
});
