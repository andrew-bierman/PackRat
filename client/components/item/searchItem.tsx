import {
  VStack,
  Input,
  Icon,
  Box,
  Text,
  ScrollView,
  IconButton,
  HStack,
  List,
} from 'native-base';
import { RStack, RInput, RIcon, RText, RScrollView, RIconButton } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform,  View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
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
    useSelector((state: any) => state.search.searchResults.items) || [];

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
    const ownerId = user._id;
    // @ts-expect-error
    const packId = window.location.pathname.substring('/path/'.length);
    const selectedItem = item._id;
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
    <RStack style={{width:"100%", maxWidth:"300px"}}>
      {/* ... */}
      <RStack style={{width: "100%", alignItem: "center"}}>
        <View style={{position:"relative", height:"auto", flexDirection: "row"}}>
          <RInput
            onChangeText={(text) => {
              setSearchString(text);
              // @ts-expect-error
              //dispatch(fetchItemsSearchResults(text));
              setShowSearchResults(true);
            }}
            placeholder={placeholder ?? 'Type here to search'}
            style={{
              width:"100%",
              borderRadius:"4",
              padding:"16px 8px",
              backgroundColor: "white",
            }}
            value={searchString}
            fontSize={14}
          />
          <RIconButton
            backgroundColor="transparent"
            icon={showSearchResults 
              ? (
                <MaterialIcons name="close" size={24} color="gray"/>
              ) : (
                <MaterialIcons name="search" size={24} color="gray"/>
              )}
              onPress={ showSearchResults && (
                () => {
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
                <List space={2} w="100%" zIndex={10}>
                  {searchResults.map((result, i) => (
                    <Pressable
                      key={`result + ${i}`}
                      onPress={() => {
                        handleSearchResultClick(result, i);
                        setShowSearchResults(false);
                        setSearchString('');
                      }}
                      // @ts-expect-error
                      underlayColor="gray.100"
                    >
                      <HStack space={3}>
                        <Text fontSize="sm" ml="2" fontWeight="medium">
                          {result.name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          textTransform={'capitalize'}
                        ></Text>
                      </HStack>
                    </Pressable>
                  ))}
                </List>
              </RScrollView>
            )}
          </View>
        </View>
      </RStack>
    </RStack>
   ) : isLoadingMobile ? (
    <Text>Loading...</Text>
  ) : (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        value={searchString}
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
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
          <List space={2} w="100%">
            {searchResults.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                onPress={() => handleSearchResultClick(result, i)}
                // @ts-expect-error
                underlayColor="gray.100"
              >
                <HStack space={3}>
                  <Text fontSize="sm" fontWeight="medium"></Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textTransform={'capitalize'}
                  ></Text>
                </HStack>
              </Pressable>
            ))}
          </List>
        </RScrollView>
      )}
    </VStack>
  );
};
