import React, {
  cloneElement,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform, type TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useSearchInput from './useSearchInput';
import useTheme from 'app/hooks/useTheme';
import {
  RStack as OriginalRStack,
  RInput as OriginalRInput,
  RButton as OriginalRButton,
  RScrollView as OriginalRScrollView,
  RIconButton,
} from '@packrat/ui';
import { View, Pressable as OriginalPressable } from 'react-native';
import { Adapt, Popover as OriginalPopover, Button } from 'tamagui';
import { SearchResults } from './SearchResults';

const Popover = OriginalPopover;
const RStack = OriginalRStack;
const RInput: any = OriginalRInput;
const RScrollView = OriginalRScrollView;
const RButton = OriginalRButton;
const Pressable = OriginalPressable;

interface SearchInputProps {
  onSelect: (result: any, index: number) => void;
  onCreate: (result: any, index: number) => void;
  results: any[];
  onChange: (text: string) => void;
  searchString: string;
  placeholder?: string;
  canCreateNewItem?: boolean;
  resultItemComponent: React.ReactElement;
  shouldNavigateBackOnClear?: boolean;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  function SearchInput(
    {
      onSelect,
      onCreate,
      placeholder,
      resultItemComponent: ResultItemComponent,
      results,
      onChange,
      searchString,
      canCreateNewItem = false,
      shouldNavigateBackOnClear = false,
    },
    inputRef,
  ) {
    const inputContainerRef = useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const [isFocused, setIsFocused] = useState(false);
    const navigation = Platform.OS === 'web' ? null : useNavigation();

    useLayoutEffect(() => {
      if (inputContainerRef.current) {
        setInputWidth(inputContainerRef.current.offsetWidth);
      }
    }, [inputContainerRef.current]);

    const {
      handleClearSearch,
      handleSearchResultClick,
      handleSearchChange,
      showSearchResults,
      isLoadingMobile,
      isVisible,
    } = useSearchInput({ onSelect, onChange, onCreate, searchString });

    const options = useSearchOptions(results, searchString, canCreateNewItem);
    const { isDark, currentTheme } = useTheme();

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleClearSearchWithOptionalNavigation = () => {
      handleClearSearch();
      if (shouldNavigateBackOnClear && navigation?.canGoBack()) {
        navigation.goBack();
      }
    };

    if (Platform.OS === 'web') {
      return (
        <Popover size="$20" allowFlip placement="bottom" open={isVisible}>
          <Popover.Trigger asChild>
            <RStack ref={inputContainerRef} style={{ width: '100%' }}>
              <RInput
                ref={inputRef}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${currentTheme.colors.border}`,
                  backgroundColor: currentTheme.colors.card,
                  fontSize: '16px',
                  color: currentTheme.colors.text,
                }}
                placeholder={placeholder ?? 'Search'}
                value={searchString}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {(searchString || isFocused) && (
                <MaterialIcons
                  name="close"
                  style={
                    {
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 20,
                      color: currentTheme.colors.text,
                      cursor: 'pointer',
                    } as any
                  }
                  onClick={handleClearSearch}
                />
              )}
            </RStack>
          </Popover.Trigger>
          {showSearchResults && (
            <Popover.Content
              style={{
                borderWidth: 1,
                borderRadius: 8,
                padding: 8,
                backgroundColor: isDark
                  ? currentTheme.colors.black
                  : currentTheme.colors.white,
                maxHeight: 200,
                overflowY: 'auto',
                width: inputWidth,
              }}
            >
              <RStack
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {options.map((result, i) => (
                  <RStack
                    key={`result-${i}`}
                    role="listitem"
                    style={{
                      cursor: 'pointer',
                      padding: 8,
                      borderRadius: 4,
                      backgroundColor: result.isDisabled
                        ? 'transparent'
                        : currentTheme.colors.card,
                    }}
                    onClick={() =>
                      !result.isDisabled && handleSearchResultClick(result)
                    }
                  >
                    {cloneElement(ResultItemComponent, { item: result })}
                  </RStack>
                ))}
              </RStack>
            </Popover.Content>
          )}
        </Popover>
      );
    } else {
      return (
        <RStack
          minWidth="100%"
          alignSelf="center"
          position="relative"
          backgroundColor={currentTheme.colors.background}
          paddingTop={10}
          borderRadius={8}
        >
          <RStack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderBottomWidth={1}
            borderColor={currentTheme.colors.border}
            padding={4}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={currentTheme.colors.text}
              style={{ marginLeft: 10 }}
            />
            <RInput
              ref={inputRef}
              placeholder={placeholder ?? 'Search'}
              onChangeText={handleSearchChange}
              value={searchString}
              showLoading={isLoadingMobile}
              platform={Platform.OS}
              focusable
              lightTheme
              showCancel={true}
              selectTextOnFocus
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                backgroundColor: 'transparent',
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                borderTopWidth: 0,
                borderRadius: 0,
                padding: 0,
                margin: 0,
                flex: 1,
                fontSize: 20,
              }}
            />
            {(searchString || isFocused) && (
              <RIconButton
                onPress={handleClearSearchWithOptionalNavigation}
                style={{ backgroundColor: 'transparent' }}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={currentTheme.colors.text}
                />
              </RIconButton>
            )}
          </RStack>
          <SearchResults
            results={options}
            onResultClick={handleSearchResultClick}
            resultItemComponent={ResultItemComponent}
            isVisible={isVisible}
          />
        </RStack>
      );
    }
  },
);

const useSearchOptions = (
  results: any,
  searchString: string,
  canCreateNewItem: boolean,
) => {
  return useMemo(() => {
    if (!Array.isArray(results)) return [];
    if (!canCreateNewItem) return results;

    const hasExactMatch = results.some(
      (result) => result.name.toLowerCase() === searchString?.toLowerCase(),
    );

    return hasExactMatch
      ? [...results]
      : [
          {
            id: 'create',
            name: `Create "${searchString}"`,
            title: searchString,
          },
          ...results,
        ];
  }, [results]);
};

const styles = StyleSheet.create({
  webInput: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});
