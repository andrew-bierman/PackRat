import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useSearchInput from 'app/hooks/search/useSearchInput';
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

export const SearchInput = ({ onSelect, placeholder }) => {
  const {
    searchString,
    setSearchString,
    showSearchResults,
    setShowSearchResults,
    data,
    handleSearchResultClick,
    handleClearSearch,
    isLoadingMobile,
    handleChange,
    searchInput,
  } = useSearchInput(onSelect);

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
            ref={searchInput}
            paddingLeft={35}
            paddingRight={55}
            placeholder={placeholder ?? 'Search'}
            onChangeText={handleChange}
          />
          <MaterialIcons
            name="search"
            style={{
              position: 'absolute',
              height: '100%',
              alignSelf: 'center',
              display: searchString ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              fontSize: 20,
              right: 0,
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
          {showSearchResults && searchInput.current?.value != '' && (
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
                {data?.map((result, i) => (
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
                    <RStack style={{ flexDirection: 'row' }}>
                      <RText fontWeight="400">{result.properties.name}</RText>
                      <RText
                        color={'gray'}
                        opacity={100}
                        textTransform={'capitalize'}
                      >
                        {result.properties.osm_value}
                      </RText>
                    </RStack>
                  </RStack>
                ))}
              </View>
            </RScrollView>
          )}
        </RStack>
      </RStack>
    </RStack>
  ) : isLoadingMobile ? (
    <RText>Loading...</RText>
  ) : (
    <RStack style={{ width: '100%', alignSelf: 'center' }}>
      <RInput
        onChangeText={(text) => {
          setSearchString(text);
        }}
        placeholder="Search"
        width={'100%'}
        borderRadius={4}
        backgroundColor="white"
        value={searchString}
        fontSize={14}
        paddingVertical={16}
        paddingHorizontal={8}
      />
      <RIconButton
        backgroundColor="transparent"
        icon={<MaterialIcons name="search" size={24} color="gray" />}
      />

      {showSearchResults && data?.length > 0 && (
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
          zIndex={10}
        >
          <View role="list" style={{ width: '100%' }}>
            {data.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => {
                  handleSearchResultClick(result);
                }}
              >
                <RStack style={{ flexDirection: 'row' }}>
                  <RText fontWeight="400">{result.properties.name}</RText>
                  <RText color="gray" textTransform={'capitalize'}>
                    {result.properties.osm_value}
                  </RText>
                </RStack>
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
