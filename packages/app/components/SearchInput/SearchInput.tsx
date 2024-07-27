import React, { cloneElement, type ReactNode, forwardRef } from 'react';
import { Platform, type TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useSearchInput from './useSearchInput';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';

import {
  RStack as OriginalRStack,
  RInput as OriginalRInput,
  RButton as OriginalRButton,
  RScrollView as OriginalRScrollView,
  RIconButton,
} from '@packrat/ui';
import { View, Pressable as OriginalPressable } from 'react-native';

const RStack: any = OriginalRStack;
const RInput: any = OriginalRInput;
const RScrollView: any = OriginalRScrollView;
const RButton: any = OriginalRButton;
const Pressable: any = OriginalPressable;

interface SearchInputProps {
  onSelect: (result: any, index: number) => void;
  results: any[];
  onChange: (text: string) => void;
  searchString?: string;
  placeholder?: string;
  resultItemComponent: React.ReactElement;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  function SearchInput(
    {
      onSelect,
      placeholder,
      resultItemComponent: ResultItemComponent,
      results,
      onChange,
      searchString,
    },
    inputRef,
  ) {
    const {
      handleClearSearch,
      handleSearchResultClick,
      handleSearchChange,
      showSearchResults,
      isLoadingMobile,
      isVisible,
    } = useSearchInput({ onSelect, onChange, searchString });

    const { isDark, currentTheme } = useTheme();
    const styles = useCustomStyles(loadStyles);
    if (Platform.OS === 'web') {
      return (
        <RStack style={styles.container}>
          <RStack
            style={{ position: 'relative', height: 'auto', width: '100%' }}
          >
            <RStack
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <RInput
                style={{ flex: 1 }}
                paddingLeft={35}
                paddingRight={55}
                placeholder={placeholder ?? 'Search'}
                onChangeText={handleSearchChange}
                value={searchString}
              />
              <MaterialIcons
                name="search"
                style={{
                  position: 'absolute',
                  height: '100%',
                  alignSelf: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  fontSize: 20,
                }}
              />
              {searchString && (
                <RButton
                  onPress={() => {
                    handleClearSearch();
                  }}
                  style={{
                    position: 'absolute',
                    right: 1,
                    backgroundColor: 'transparent',
                  }}
                  width={10}
                >
                  <MaterialIcons name="close" />
                </RButton>
              )}
            </RStack>

            <RStack
              style={{
                position: 'relative',
                display: isVisible ? 'block' : 'none',
              }}
            >
              {showSearchResults && results && results?.length > 0 && (
                <RScrollView
                  position="absolute"
                  top="100%"
                  left="0"
                  right="0"
                  maxHeight={150}
                  borderWidth={1}
                  borderRadius={12}
                  backgroundColor={
                    !isDark
                      ? currentTheme.colors.white
                      : currentTheme.colors.black
                  }
                  style={{
                    borderColor: isDark ? '#F8F8F8' : '##D1D5DB',
                  }}
                  showsVerticalScrollIndicator={false}
                  zIndex={20000}
                >
                  <View
                    role="list"
                    style={{
                      width: '100%',
                      gap: 8,
                      padding: 8,
                      backgroundColor: isDark
                        ? '#1A1A1D'
                        : currentTheme.colors.white,
                    }}
                  >
                    {results.map((result, i) => (
                      <RStack
                        key={`result + ${i}`}
                        role="listitem"
                        onPress={() => {
                          handleSearchResultClick(result);
                        }}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        {cloneElement(ResultItemComponent, { item: result })}
                      </RStack>
                    ))}
                  </View>
                </RScrollView>
              )}
            </RStack>
          </RStack>
        </RStack>
      );
    } else {
      return (
        <RStack
          minWidth="100%"
          alignSelf="center"
          position="relative"
          backgroundColor={currentTheme.colors.white}
          borderRadius={8}
        >
          <RStack
            flexDirection="row"
            alignItems="center"
            borderBottomWidth={1}
            borderColor={currentTheme.colors.background}
            padding={4}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={currentTheme.colors.background}
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
              }}
            />
            {searchString && searchString.trim().length > 0 && (
              <RIconButton
                onPress={handleClearSearch}
                style={{ backgroundColor: 'transparent' }}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={currentTheme.colors.background}
                />
              </RIconButton>
            )}
          </RStack>
          <RStack
            style={{
              position: 'relative',
              display: isVisible ? 'block' : 'none',
            }}
          >
            {showSearchResults && results?.length > 0 && (
              <RScrollView keyboardShouldPersistTaps="handled">
                <View role="list" style={{ width: '100%' }}>
                  {results.map((result, i) => (
                    <Pressable
                      key={`result + ${i}`}
                      role="listitem"
                      onPress={() => {
                        handleSearchResultClick(result);
                      }}
                      paddingHorizontal={16}
                      paddingVertical={8}
                    >
                      {cloneElement(ResultItemComponent, { item: result })}
                    </Pressable>
                  ))}
                </View>
              </RScrollView>
            )}
          </RStack>
        </RStack>
      );
    }
  },
);

const loadStyles = () => ({
  container: {
    marginTop: 20,
    marginBottom: 15,
    // maxWidth: 800,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
