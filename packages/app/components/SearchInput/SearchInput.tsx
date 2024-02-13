import React, { cloneElement } from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
import { SearchBar } from '@rneui/themed';

export const SearchInput = ({
  onSelect,
  placeholder,
  resultItemComponent: ResultItemComponent,
  results,
  onChange,
  searchString,
}) => {
  const {
    handleClearSearch,
    handleSearchResultClick,
    handleSearchChange,
    showSearchResults,
    isLoadingMobile,
  } = useSearchInput({ onSelect, onChange, searchString });

  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  return Platform.OS === 'web' ? (
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
              <View role="list" style={{ width: '100%', gap: 8, padding: 8 }}>
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
  ) : (
    <RStack minWidth="100%" alignSelf="center" position="relative">
      <SearchBar
        placeholder={placeholder ?? 'Search'}
        onChangeText={handleSearchChange}
        value={searchString}
        onClear={handleClearSearch}
        showLoading={isLoadingMobile}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        focusable
        lightTheme
        showCancel={true}
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      {showSearchResults && results?.length > 0 && (
        <RScrollView
          position="absolute"
          top="100%"
          left="0"
          right="0"
          maxHeight="100"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius={12}
          backgroundColor={currentTheme.colors.white}
          showsVerticalScrollIndicator={false}
          zIndex={20000}
        >
          <View role="list" style={{ width: '100%' }}>
            {results.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => {
                  handleSearchResultClick(result);
                }}
              >
                {cloneElement(ResultItemComponent, { item: result })}
              </Pressable>
            ))}
          </View>
        </RScrollView>
      )}
    </RStack>
  );
};

const loadStyles = () => ({
  container: {
    marginTop: 20,
    marginBottom: 15,
    maxWidth: 400,
  },
});
