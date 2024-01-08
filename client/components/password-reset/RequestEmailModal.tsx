import React, { useState } from 'react';
import { RInput } from '@packrat/ui';
import { CustomModal } from '../modal';
import axios from '~/config/axios';
import { api } from '../../constants/api';
import { InformUser } from '../../utils/ToastUtils';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import useRequestEmailModal from '~/hooks/password-reset/useRequestEmailModal';

export const RequestPasswordResetEmailModal = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const {
    isOpen,
    setIsOpen,
    email,
    setEmail,
    loading,
    handleResetPasswordEmail,
  } = useRequestEmailModal();
  return (
    <CustomModal
      title="Reset Password"
      trigger="Request Password Reset Email"
      isActive={isOpen}
      onTrigger={setIsOpen}
      footerButtons={[
        {
          label: 'Send Email',
          onClick: handleResetPasswordEmail,
          disabled: !email || loading,
        },
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: () => {
            setIsOpen(false);
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
    </CustomModal>
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
