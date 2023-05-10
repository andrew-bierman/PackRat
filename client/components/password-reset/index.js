import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box, Button, Center, Heading, Input, Text, Toast, VStack } from 'native-base';
import axios from 'axios';
import { api } from '../../constants/api';
import { PasswordResetForm } from './PasswordResetForm';

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
        title: 'Password reset email sent',
        style: { backgroundColor: 'green' },
        placement: 'top-right',
        duration: 5000,
      });
    } catch (error) {
      console.log("Error here", error);
      setLoading(false);
      Toast.show({ title: error?.response?.data?.error, duration: 7000, placement: 'top-right', style: { backgroundColor: 'red' } })
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          <Text>Reset Password</Text>
        </Heading>

        <VStack space={3} mt="5">
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
          <View>
            <PasswordResetForm />
          </View>
        </VStack>
      </Box>

    </Center>

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
