import { Form, FormInput, RText, SubmitButton } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { View } from 'tamagui';

export const NewsLetter = () => {
  const { currentTheme } = useTheme();
  return (
    <Form>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,}}>
        <FormInput
          // label="Email ID"
          keyboardType="email-address"
          placeholder='Email Address'
          name="email"
          aria-label="Email"
        />
        <SubmitButton
          style={{
            backgroundColor: '#232323',
            color: 'white',
          }}
        >
          <RText style={{ color: currentTheme.colors.white }}>Join Newsletter</RText>
        </SubmitButton>
      </View>
    </Form>
  );
};
