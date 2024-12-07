import React, { useState } from 'react';
import { View } from 'react-native';
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
import useCustomStyles from '~/hooks/useCustomStyles';

export const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const styles = useCustomStyles(loadStyles);

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

const loadStyles = () => ({
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
