import { Platform, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { RStack, RInput, RText, RScrollView, RIconButton } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchItemsSearchResults } from '../../store/searchStore';
import { selectItemsGlobal } from '../../store/singlePackStore';
import useSearchItem from 'app/hooks/item/useSearchItem';

interface Props {
  onSelect?: () => void;
  placeholder?: string;
}

export const SearchItem: React.FC<Props> = ({ onSelect, placeholder }) => {
  const dispatch = useDispatch();
  const {
    searchString,
    setSearchString,
    isLoadingMobile,
    setIsLoadingMobile,
    selectedSearch,
    setSelectedSearch,
    searchResults,
    user,
    showSearchResults,
    setShowSearchResults,
    handleSearchResultClick,
  } = useSearchItem({ dispatch });

  return Platform.OS === 'web' ? (
    <RStack style={{ width: '100%', maxWidth: 300 }}>
      {/* ... */}
      <RStack style={{ width: '100%', alignItems: 'center' }}>
        <View
          style={{ position: 'relative', height: 'auto', flexDirection: 'row' }}
        >
          <RInput
            onChangeText={(text: string) => {
              setSearchString(text);
              dispatch(fetchItemsSearchResults(text));
              setShowSearchResults(true);
            }}
            placeholder={placeholder ?? 'Type here to search'}
            value={searchString}
            fontSize={14}
            width="100%"
            borderRadius={4}
            padding="16px 8px"
            backgroundColor="white"
          />
          <RIconButton
            backgroundColor="transparent"
            icon={
              showSearchResults ? (
                <MaterialIcons name="close" size={24} color="gray" />
              ) : (
                <MaterialIcons name="search" size={24} color="gray" />
              )
            }
            onPress={
              showSearchResults &&
              (() => {
                setShowSearchResults(false);
                setSearchString('');
              })
            }
            disabled={!showSearchResults}
          />

          <View style={{ position: 'relative' }}>
            {showSearchResults && searchResults?.length > 0 && (
              <RScrollView
                position="absolute"
                top="100%"
                left="0"
                right="0"
                maxHeight="100"
                borderWidth={1}
                borderColor="gray.200"
                borderRadius={12}
                backgroundColor="white"
                showsVerticalScrollIndicator={false}
                zIndex={10}
              >
                <View role="list" style={{ width: '100%', zIndex: 10 }}>
                  {searchResults.map((result, i) => (
                    <Pressable
                      key={`result + ${i}`}
                      role="listitem"
                      onPress={() => {
                        handleSearchResultClick(result, i);
                        setShowSearchResults(false);
                        setSearchString('');
                      }}
                      // @ts-expect-error
                      underlayColor="gray.100"
                    >
                      <RStack style={{ flexDirection: 'row' }}>
                        <RText fontWeight="400">{result.name}</RText>
                        <RText
                          color="gray"
                          textTransform={'capitalize'}
                        ></RText>
                      </RStack>
                    </Pressable>
                  ))}
                </View>
              </RScrollView>
            )}
          </View>
        </View>
      </RStack>
    </RStack>
  ) : isLoadingMobile ? (
    <RText>Loading...</RText>
  ) : (
    <RStack style={{ width: '100%', alignSelf: 'center' }}>
      <RInput
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search"
        value={searchString}
        fontSize={14}
        width="100%"
        borderRadius={4}
        padding="16px 8px"
        backgroundColor="white"
      />
      <RIconButton
        backgroundColor="transparent"
        icon={<MaterialIcons name="search" size={24} color="gray" />}
      />

      {showSearchResults && searchResults?.length > 0 && (
        <RScrollView
          position="absolute"
          top="100%"
          left="0"
          right="0"
          maxHeight="100"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius={12}
          backgroundColor="white"
          showsVerticalScrollIndicator={false}
          zIndex={10}
        >
          <View role="list" style={{ width: '100%', gap: 8, padding: 8 }}>
            {searchResults.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => handleSearchResultClick(result, i)}
              >
                <RStack style={{ flexDirection: 'row' }}>
                  <RText fontWeight="400"></RText>
                  <RText color="gray" textTransform={'capitalize'}></RText>
                </RStack>
              </Pressable>
            ))}
          </View>
        </RScrollView>
      )}
    </RStack>
  );
};
