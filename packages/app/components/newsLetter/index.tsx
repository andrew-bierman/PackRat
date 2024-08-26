import { RText, SubmitButton } from '@packrat/ui';
import { FormInput } from '@tamagui/lucide-icons';
import useTheme from 'app/hooks/useTheme';
import { Form, View } from 'tamagui';

export const NewsLetter = () => {
    const {currentTheme} = useTheme();
  return (
    <View>
      <Form>
        <FormInput
          label="Email ID"
          //   keyboardType="email-address"
          name="email"
          aria-label="Email"
        />
        <SubmitButton
          style={{
            marginTop: 16,
            backgroundColor: currentTheme.colors.tertiaryBlue,
            color: 'white',
          }}
          width="100%"
        >
          <RText style={{ color: currentTheme.colors.white }}>Sign In</RText>
        </SubmitButton>
      </Form>
    </View>
  );
};
