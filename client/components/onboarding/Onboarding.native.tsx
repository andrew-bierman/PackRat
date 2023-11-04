import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  type ScrollView as RNScrollView,
} from 'react-native';
import {
  Circle,
  ScrollView,
  type ScrollViewProps,
  Theme,
  type ThemeName,
  XStack,
  YStack,
  useWindowDimensions,
} from 'tamagui';
import { type OnboardingProps } from './Onboarding';
import { OnboardingControls } from './OnboardingControls';
import tools from '../../utils/tools';

const { width: DEVICE_WIDTH } = Dimensions.get('screen');
export const Onboarding = ({ onOnboarded, steps }: OnboardingProps) => {
  const [stepIdx, _setStepIdx] = useState(0);
  // prevent a background to ever "continue" animation / try to continue where it left off - cause looks weird

  const [key, setKey] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentStep = steps[stepIdx]!;
  const stepsCount = steps.length;

  const setStepIdx = (newIdx: number) => {
    if (stepIdx !== newIdx) {
      _setStepIdx(newIdx);
      setKey(key + 1);
    }
  };

  const handleScroll: ScrollViewProps['onScroll'] = (event) => {
    const val = event.nativeEvent.contentOffset.x / DEVICE_WIDTH;
    const newIdx = Math.round(val);
    if (stepIdx !== newIdx) {
      setStepIdx(newIdx);
    }
  };

  const changePage = (newStepIdx: number) => {
    scrollRef.current?.scrollTo({
      x: newStepIdx * DEVICE_WIDTH,
      animated: true,
    });
  };

  const scrollRef = useRef<RNScrollView>(null);

  const safeAreaInsets = tools.useSafeAreaInsets();

  return (
    <Theme name={currentStep.theme as ThemeName}>
      <YStack
        flex={1}
        backgroundColor="$color3"
        overflow="hidden"
        paddingBottom={safeAreaInsets.bottom}
        paddingRight={safeAreaInsets.right}
        paddingTop={safeAreaInsets.top}
        paddingLeft={safeAreaInsets.left}
      >
        <Background />

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        >
          {steps.map((step, idx) => {
            const isActive = idx === stepIdx;
            return (
              <YStack key={idx} width={DEVICE_WIDTH}>
                {isActive && <step.Content key={idx} />}
              </YStack>
            );
          })}
        </ScrollView>

        <XStack gap={10} jc="center" my="$4">
          {Array.from(Array(stepsCount)).map((_, idx) => {
            const isActive = idx === stepIdx;
            return (
              <Point
                key={idx}
                active={isActive}
                onPress={() => setStepIdx(idx)}
              />
            );
          })}
        </XStack>
        <OnboardingControls
          currentIdx={stepIdx}
          onChange={(val) => changePage(val)}
          stepsCount={stepsCount}
          onFinish={onOnboarded}
        />
      </YStack>
    </Theme>
  );
};

const Point = ({
  active,
  onPress,
}: {
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <YStack
      br="$10"
      width={active ? 30 : 10}
      height={10}
      onPress={onPress}
      backgroundColor={active ? '$color7' : '$color6'}
    />
  );
};

export const Background = () => {
  const { height } = useWindowDimensions();
  return (
    <YStack
      pos="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      jc="center"
      ai="center"
    >
      <Circle
        animation={'lazy'}
        x={0}
        y={0}
        opacity={1}
        scale={1}
        backgroundColor="$color3"
        enterStyle={{
          scale: 0,
        }}
        exitStyle={{
          scale: 10,
          opacity: 0,
        }}
        width={height * 3}
        height={height * 3}
      />
    </YStack>
  );
};
