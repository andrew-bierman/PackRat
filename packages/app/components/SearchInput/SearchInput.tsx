import React, { cloneElement, ReactNode, forwardRef } from 'react';
import { Platform, TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useSearchInput from './useSearchInput';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';

import {
  RStack,
  RInput,
  RButton,
  RText,
  RScrollView,
  RIconButton,
} from '@packrat/ui';
import { View, Pressable } from 'react-native';

interface SearchInputProps {
  onSelect: (result: any, index: number) => void;
  results: any[];
  onChange: (text: string) => void;
  searchString?: string;
  placeholder?: string;
  resultItemComponent: ReactNode;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  (
    {
      onSelect,
      placeholder,
      resultItemComponent: ResultItemComponent,
      results,
      onChange,
      searchString,
    },
    inputRef,
  ) => {
    const {
      handleClearSearch,
      handleSearchResultClick,
      handleSearchChange,
      showSearchResults,
      isLoadingMobile,
    } = useSearchInput({ onSelect, onChange, searchString });

    const { currentTheme } = useTheme();
    const styles = useCustomStyles(loadStyles);
    if (Platform.OS === 'web') {
      return (
        <RStack style={styles.container}>
          <RStack position="relative" height="auto">
            <RStack
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <RInput
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

            <RStack style={{ position: 'relative' }}>
              {showSearchResults && results && results?.length > 0 && (
                <RScrollView
                  position="absolute"
                  top="100%"
                  left="0"
                  right="0"
                  maxHeight={150}
                  borderWidth={1}
                  borderRadius={12}
                  backgroundColor={currentTheme.colors.white}
                  showsVerticalScrollIndicator={false}
                  zIndex={20000}
                >
                  <View
                    role="list"
                    style={{ width: '100%', gap: 8, padding: 8 }}
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
          backgroundColor={currentTheme.colors.text}
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
            {searchString.trim().length > 0 && (
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
      );
    }
  },
);

const loadStyles = () => ({
  container: {
    marginTop: 20,
    marginBottom: 15,
    maxWidth: 400,
    width: '100%',
  },
});
