import {
  VStack,
  Input,
  Icon,
  Text,
  ScrollView,
  HStack,
  List,
  View,
  Pressable,
} from 'native-base';
import { RStack, RInput, RButton, RText, RScrollView } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import { debounce } from 'lodash';

import useTheme from '../hooks/useTheme';
import { Platform } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import {
  fetchWeather,
  fetchWeatherWeek,
  setLatLng,
  setSearchResult,
} from '../store/weatherStore';
import useCustomStyles from '~/hooks/useCustomStyles';
import { setFilteredTrails, setTrails } from '~/store/trailsStore_copy'; // REMOVE
import useTrails from '../hooks/trails';
import useParks from '~/hooks/parks';
import { usePhotonDetail } from '~/hooks/photonDetail';
import { useFetchWeather, useFetchWeatherWeak } from '~/hooks/weather';
import {useSearch} from '../context/searchContext'

export const SearchInput = ({ onSelect, placeholder }) => {

    const debouncedSearch = debounce((query) => {
    if (query.length > 0) {
      setShowSearchResults(true);
    }
  }, 2000); 
   useEffect(() => {
    debouncedSearch(searchString);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchString]);
    const { state, dispatch } = useSearch();

  const [searchString, setSearchString] = useState('');

  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { refetch, data, isError, isLoading } = usePhotonDetail(
    searchString,
    true,
  );
  
  const searchChangeHandler = (text)=>{
    setSearchString(text)
    
    dispatch({
      type:"SET_SEARCH_STRING",payload:text
    })
  setShowSearchResults(true);

  }

  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles());

  const handleSearchResultClick = (result, index) => {
    const {
      properties: { name, osm_id },
    } = result;
    
    setSearchString(name);
    setShowSearchResults(false);
     dispatch({
      type:"SET_SELECTED_SEARCH_RESULT",payload:result
    })

    if (onSelect) {
      onSelect(result);
    }
  };

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
            style={{
              paddingLeft: '35px',
              paddingRight: '55px',
            }}
            placeholder={placeholder ?? 'Search'}
            onChangeText={searchChangeHandler}
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
              width: '40px',
              fontSize: 20,
            }}
          />
          {searchString && (
            <RButton
              onPress={() => {
                setShowSearchResults(false);
                setSearchString('');
              }}
              style={{
                position: 'absolute',
                right: 1,
                backgroundColor: 'transparent',
              }}
              width="10px"
            >
              <MaterialIcons name="close" />
            </RButton>
          )}
        </RStack>

        <RStack style={{ position: 'relative' }}>
          {data && data?.length > 0 && (
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
              <RStack space={2} w="100%">
                {showSearchResults && data.map((result, i) => (
                  <RStack
                    key={`result + ${i}`}
                    onPress={() => {
                      handleSearchResultClick(result, i);
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <RStack space={3} flexDirection="row" gap={5} padding={5}>
                      <RText fontSize="sm" fontWeight="medium">
                        {result.properties.name}
                      </RText>
                      <RText
                        style={{
                          fontSize: 'sm',
                          color: 'gray',
                          opacity: '100',
                          textTransform: 'capitalize',
                        }}
                      >
                        {result.properties.osm_value}
                      </RText>
                    </RStack>
                  </RStack>
                ))}
              </RStack>
            </RScrollView>
          )}
        </RStack>
      </RStack>
    </RStack>
  ) : isLoadingMobile ? (
    <RText>Loading...</RText>
  ) : (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        onChangeText={(text) => {
          setSearchString(text);
        }}
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

      {showSearchResults && data?.length > 0 && (
        <ScrollView
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
          <List space={2} w="100%">
            {data.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                onPress={() => {
                  handleSearchResultClick(result, i);
                }}
                underlayColor="gray.100"
              >
                <HStack space={3}>
                  <Text fontSize="sm" fontWeight="medium">
                    {result.properties.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textTransform={'capitalize'}
                  >
                    {result.properties.osm_value}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </List>
        </ScrollView>
      )}
    </VStack>
  );
};

const loadStyles = () => ({
  container: {
    marginTop: 20,
    marginBottom: 15,
    maxWidth: '400px',
  },
});
