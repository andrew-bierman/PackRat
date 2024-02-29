import React, { useState } from 'react';
import { View } from 'react-native';
import { api } from '../../constants/api';
import { PasswordResetForm } from './PasswordResetForm';
import { createParam } from '@packrat/ui';
import { RequestPasswordResetEmailModal } from './RequestEmailModal';
import useCustomStyles from 'app/hooks/useCustomStyles';

const { useParam } = createParam();

export const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const styles = useCustomStyles(loadStyles);

  //   get token from url using expo router
  const [token] = useParam('token');

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
