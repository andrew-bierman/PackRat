import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  RHeading as OriginalRHeading,
  RStack,
  RButton as OriginalRButton,
  RText as OriginalRText,
  RIconButton,
  RScrollView,
  Form as OriginalForm,
  FormInput,
  SubmitButton,
  RLink,
} from '@packrat/ui';
import { FontAwesome } from '@expo/vector-icons';
import { NODE_ENV } from '@packrat/config';
import useTheme from '../hooks/useTheme';
import { useGoogleAuth, useLogin } from 'app/auth/hooks';
import { userSignIn as userSignInSchema } from '@packrat/validations';
import { SignInScreen } from '@packrat/ui/src/Bento/forms/layouts';

const RText: any = OriginalRText;
const RHeading: any = OriginalRHeading;
const Form: any = OriginalForm;
const RButton: any = OriginalRButton;

const demoUser = {
  email: 'zoot3@email.com',
  password: '12345678',
};

export default function Login() {
  const { handleLogin } = useLogin();
  const { enableGoogleLogin, isGoogleSignInReady, promptAsync } =
    useGoogleAuth();
  const { currentTheme } = useTheme();

  return (
    <RScrollView>
      <RStack>
        <RStack
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor:
              currentTheme.colors.background === '#0284c7'
                ? 'white'
                : currentTheme.colors.background,
          }}
        >
          <View
            style={{
              paddingTop: 32,
              paddingBottom: 32,
              width: '90%',
              maxWidth: 400,
            }}
          >
            <SignInScreen mode="signin"/>
          </View>
        </RStack>
      </RStack>
    </RScrollView>
  );
}
