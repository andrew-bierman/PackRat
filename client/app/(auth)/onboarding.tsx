import React from 'react';
import { View, Text } from 'react-native';
import { OnboardingScreen } from '../../screens/user/OnboardingScreen';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <OnboardingScreen />
    </>
  );
}
