import React from 'react';
import { ArrowUp, Rocket, Sparkles } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Onboarding } from '../../components/onboarding/Onboarding';
import { type OnboardingStepInfo } from '../../components/onboarding/Onboarding';
import { StepContent } from '../../components/onboarding/OnboardingStepContent';

const steps: OnboardingStepInfo[] = [
  {
    theme: 'orange',
    Content: () => (
      <StepContent
        title="Trips and Route Planning"
        icon={Sparkles}
        description="Create and manage trips with route planning and maps"
      />
    ),
  },
  {
    theme: 'green',
    Content: () => (
      <StepContent
        title="Activities"
        icon={ArrowUp}
        description="Get Activity suggestions and have packing list as well as Realtime Weather forecast for trip locations"
      />
    ),
  },
  {
    theme: 'blue',
    Content: () => (
      <StepContent
        title="User Authentication"
        icon={Rocket}
        description="Save your hikes and packs, and sync between devices"
      />
    ),
  },
];

/**
 * note: this screen is used as a standalone page on native and as a sidebar on auth layout on web
 */
export const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <Onboarding
      autoSwipe
      onOnboarded={() => router.push('/register')}
      steps={steps}
    />
  );
};
