// SearchResults.tsx
import { RScrollView, RStack, YStack } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import React, { cloneElement } from 'react';
import { Platform, Pressable, SafeAreaView } from 'react-native';

interface SearchResultsProps {
  results: any[];
  onResultClick: (result: any, index: number) => void;
  resultItemComponent: React.ReactElement;
  isVisible: boolean;
  containerWidth?: number; // For web width adjustments
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
  resultItemComponent: ResultItemComponent,
  isVisible,
  containerWidth,
}) => {
  const { isDark, currentTheme } = useTheme();

  if (!isVisible) return null;

  const content = (
    <YStack
      role="list"
      style={{
        width: containerWidth || '100%',
        maxHeight: Platform.OS === 'web' ? 200 : undefined,
        overflow: Platform.OS === 'web' ? 'scroll' : 'hidden',
      }}
      gap="$2"
      pt="$2"
    >
      {results &&
        Array.isArray(results) &&
        results.map((result, index) => (
          <Pressable
            key={`result-${index}`}
            role="listitem"
            onPress={() => onResultClick(result, index)}
          >
            {cloneElement(ResultItemComponent, {
              item: result,
              key: `item-${index}`,
              onPress: () => onResultClick(result, index),
            })}
          </Pressable>
        ))}
    </YStack>
  );

  return Platform.OS === 'web' ? (
    <RStack
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        backgroundColor: isDark
          ? currentTheme.colors.black
          : currentTheme.colors.white,
        width: containerWidth,
      }}
    >
      {content}
    </RStack>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <RScrollView keyboardShouldPersistTaps="handled">{content}</RScrollView>
    </SafeAreaView>
  );
};
