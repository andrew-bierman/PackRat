import React from 'react';

import { XStack, YStack } from 'tamagui';
import { OnboardingScreen } from '../screens/user/OnboardingScreen';

export interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <XStack f={1}>
      <YStack f={2} fb={0} jc="center">
        <YStack px="$4">{children}</YStack>
      </YStack>

      <YStack $sm={{ display: 'none' }} f={3} fb={0}>
        <OnboardingScreen />
      </YStack>
    </XStack>
  );
};
