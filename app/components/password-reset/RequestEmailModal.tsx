import React, { useState } from 'react';
import { BaseModal, RInput } from '@packrat/ui';
import axios from '~/config/axios';
import { api } from '../../constants/api';
import { InformUser } from '../../utils/ToastUtils';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

export const RequestPasswordResetEmailModal = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
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
      console.log('Error here', error);
      setLoading(false);
      InformUser({
        title: error?.response?.data?.error,
        duration: 7000,
        placement: 'top-right',
        style: { backgroundColor: currentTheme.colors.error },
      });
    }
  };

  return (
    <BaseModal
      title="Reset Password"
      trigger="Request Password Reset Email"
      footerButtons={[
        {
          label: 'Send Email',
          onClick: handleResetPasswordEmail,
          disabled: !email || loading,
        },
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => {
            closeModal();
          },
        },
      ]}
    >
      <RInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      {/* <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    {/* <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        <Text>Reset Password</Text>
                    </Heading>

                    <VStack space={1} mt="5">
                        <View style={styles.container}>

                            <Button
                                block
                                style={styles.button}
                                onPress={handleResetPasswordEmail}
                                disabled={!email || loading}
                            >
                                <Text>{loading ? 'Loading...' : 'Request Password Reset Email'}</Text>
                            </Button>
                        </View>
                    </VStack>
                </Box>

            </Center> */}
    </BaseModal>
  );
};

const loadStyles = () => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
  resetForm: {
    marginTop: 20,
  },
});
