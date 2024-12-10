import React, { type FC } from 'react';
import { RButton, RText, XStack, YStack } from '@packrat/ui';
import { XCircle } from '@tamagui/lucide-icons';
import useTheme from 'app/hooks/useTheme';
import { View } from 'react-native';

export interface ErrorCardProps {
  title?: string;
  message: string;

  onRetry?: () => void;
}

export const ErrorCard: FC<ErrorCardProps> = ({
  message,
  title = 'Server error',
  onRetry,
}) => {
  const { currentTheme } = useTheme();

  return (
    <YStack
      style={{
        borderColor: currentTheme.colors.error,
        backgroundColor: `${currentTheme.colors.error}70`,
        borderWidth: 1,
        borderRadius: 8,
        gap: 16,
        padding: 16,
      }}
    >
      <XStack gap={8} style={{ alignItems: 'flex-start', width: 320 }}>
        <XCircle
          size={20}
          style={{ color: currentTheme.colors.error, marginTop: 4 }}
        />
        <View style={{ flex: 1 }}>
          <RText style={{ color: currentTheme.colors.error, fontWeight: 600 }}>
            {title}
          </RText>
          <RText
            style={{
              color: currentTheme.colors.error,
              paddingTop: 8,
            }}
          >
            {message}
          </RText>
        </View>
      </XStack>
      {typeof onRetry === 'function' && (
        <RButton
          style={{
            padding: 0,
            width: 72,
            marginTop: 8,
            backgroundColor: 'white',
            color: currentTheme.colors.error,
            fontWeight: 600,
          }}
          onPress={onRetry}
        >
          Retry
        </RButton>
      )}
    </YStack>
  );
};
