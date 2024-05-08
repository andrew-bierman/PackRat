// frontend/components/PasswordResetForm.js
import React from 'react';
import { View } from 'react-native';
import { Form, RText, FormInput, SubmitButton } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { usePasswordResetForm } from 'app/hooks/password-reset';
import { resetPassword } from '@packrat/validations';
import { PasswordResetAlert } from './PasswordResetAlert';

export const PasswordResetForm = ({ token }: { token: string }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  const { loading, handlePasswordReset, resetToken, isPasswordUpdated } =
    usePasswordResetForm();

  return (
    <View style={styles.container}>
      {!isPasswordUpdated ? (
        <Form
          validationSchema={resetPassword}
          defaultValues={{ password: '', resetToken }}
        >
          <RText
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 24,
              marginBottom: 16,
            }}
          >
            Reset Password
          </RText>
          <FormInput
            placeholder="New Password"
            secureTextEntry
            name="password"
          />
          <SubmitButton
            style={styles.button}
            onSubmit={handlePasswordReset}
            disabled={loading}
          >
            <RText>{loading ? 'Loading...' : 'Reset Password'}</RText>
          </SubmitButton>
        </Form>
      ) : (
        <PasswordResetAlert />
      )}
    </View>
  );
};

const loadStyles = () => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 40,
  },
  button: {
    marginTop: 20,
  },
});
