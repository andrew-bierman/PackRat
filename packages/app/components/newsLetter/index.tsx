import React from 'react';
import { Form, FormInput, RText, SubmitButton } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { View } from 'tamagui';
import { StyleSheet } from 'react-native';

export const NewsLetter = () => {
  const { currentTheme } = useTheme();
  const { xs, sm, md } = useResponsive();
  const styles = StyleSheet.create(loadStyles(currentTheme, xs, sm, md));
  return (
    <Form>
      <View style={styles.container}>
        <FormInput
          // label="Email ID"
          keyboardType="email-address"
          placeholder="Email Address"
          name="email"
          aria-label="Email"
        />
        <SubmitButton style={styles.submitButton} onSubmit={() => {}}>
          <RText style={{ color: currentTheme.colors.white }}>
            Join Newsletter
          </RText>
        </SubmitButton>
      </View>
    </Form>
  );
};

const loadStyles = (currentTheme, xs, sm, md) => {
  return StyleSheet.create({
    container: {
      width: xs ? '100%' : 'auto',
      flexDirection: xs ? 'column' : 'row',
      alignItems: xs ? 'center' : 'center',
      justifyContent: 'center',
      gap: 10,
    },
    submitButton: {
      backgroundColor: '#232323',
      color: 'white',
      width: xs ? '100%' : 'auto',
    },
  });
};
