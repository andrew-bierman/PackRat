import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  Toast,
  VStack,
} from 'native-base';
import { api } from '../../constants/api';
import { PasswordResetForm } from './PasswordResetForm';

import { CustomModal } from '../modal';
import { useSearchParams } from 'expo-router';
import { RequestPasswordResetEmailModal } from './RequestEmailModal';

export const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  //   get token from url using expo router
  const { token } = useSearchParams();

  return (
    <>
      {token ? (
        <View style={styles.resetForm}>
          <PasswordResetForm token={token} />
        </View>
      ) : (
        <RequestPasswordResetEmailModal />
      )}
    </>
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
  resetForm: {
    marginTop: 20,
  },
});
