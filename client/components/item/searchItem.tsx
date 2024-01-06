import { Platform, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RStack, RInput, RText, RScrollView, RIconButton } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchItemsSearchResults } from '../../store/searchStore';
import { selectItemsGlobal } from '../../store/singlePackStore';

interface Props {
  onSelect?: () => void;
  placeholder?: string;
}

export const SearchItem: React.FC<Props> = ({ onSelect, placeholder }) => {
  const [searchString, setSearchString] = useState('');
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');

  const searchResults =
    useSelector((state: any) => state.search.searchResults) || [];
  const user = useSelector((state: any) => state.auth.user);
  const [showSearchResults, setShowSearchResults] = useState(false);

  /**
   * Handles the click event when a search result item is clicked.
   *
   * @param {Object} item - The search result item that was clicked.
   * @param {number} index - The index of the search result item in the list.
   * @return {void} This function does not return a value.
   */
  const handleSearchResultClick = (item, index) => {
    const ownerId = user.id;
    // @ts-expect-error
    const packId = window.location.pathname.substring('/path/'.length);
    const selectedItem = item?._id;
    const data = {
      ownerId,
      packId,
      selectedItem,
    };
    // @ts-expect-error
    dispatch(selectItemsGlobal(data));
  };

  const dispatch = useDispatch();

  return Platform.OS === 'web' ? (
    <RStack style={{ width: '100%', maxWidth: '300px' }}>
      {/* ... */}
      <RStack style={{ width: '100%', alignItems: 'center' }}>
        <View
          style={{ position: 'relative', height: 'auto', flexDirection: 'row' }}
        >
          <RInput
            onChangeText={(text) => {
              const packId = window.location.pathname.split('/').pop();
              setSearchString(text);
              // @ts-expect-error
              dispatch(fetchItemsSearchResults(text, packId));
              setShowSearchResults(true);
            }}
            placeholder={placeholder ?? 'Type here to search'}
            style={{
              width: '100%',
              borderRadius: '4',
              padding: '16px 8px',
              backgroundColor: 'white',
            }}
            value={searchString}
            fontSize={14}
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
        style={{
          width: '100%',
          borderRadius: '4',
          padding: '16px 8px',
          backgroundColor: 'white',
        }}
        value={searchString}
        fontSize={14}
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
          <View
            role="list"
            style={{ width: '100%', gap: '8px', padding: '8px' }}
          >
            {searchResults.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => handleSearchResultClick(result, i)}
                // @ts-expect-error
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
