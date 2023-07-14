import { StyleSheet } from 'react-native';

import {
  VStack,
  Input,
  Icon,
  Box,
  Divider,
  Text,
  ScrollView,
  Button,
  IconButton,
  Center,
  Heading,
<<<<<<< HEAD
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
=======
  HStack,
  List,
  View,
  Pressable,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
>>>>>>> f2fc0eb8af20a251efb67559880e245cf7d90cab

import { SafeAreaView } from 'react-native';

import { Platform } from 'react-native';

<<<<<<< HEAD
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { Google_Api_Key } from "../constants/api";

// redux
import { useDispatch } from 'react-redux';
import { add, addWeek } from '../store/weatherStore';
=======
// redux
import { useDispatch, useSelector } from "react-redux";
>>>>>>> f2fc0eb8af20a251efb67559880e245cf7d90cab

import { useState, useEffect } from 'react';

<<<<<<< HEAD
import { getGeoCode } from '../api/getGeoCode';
import { getWeather } from '../api/getWeather';
import { getWeatherWeek } from '../api/getWeatherWeek';

export const SearchInput = () => {
  const [searchString, setSearchString] = useState('Virginia US');
  const [geoCode, setGeoCode] = useState();
=======
// import { getTrailsResult } from "../api/getTrailsResult";
// import { getPhotonResults } from "../api/getPhotonResults";

import {
  fetchTrails,
  filterTrailsForNames,
  setTrailNames,
  setTrails,
} from "../store/trailsStore";

import { fetchParks } from "../store/parksStore";

import {
  setSearchResults,
  setSelectedSearchResult,
  clearSearchResults,
  fetchPhotonSearchResults,
} from "../store/searchStore";
import { getTrailsOSM } from "../api/getTrails";
import { getParksOSM } from "../api/getParks";
import { fetchWeather, fetchWeatherWeek } from "../store/weatherStore";

export const SearchInput = ({ onSelect, placeholder }) => {
  const [searchString, setSearchString] = useState("");
>>>>>>> f2fc0eb8af20a251efb67559880e245cf7d90cab
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState("");

  const searchResults =
    useSelector((state) => state.search.searchResults) || [];

  const selectedSearchResult =
    useSelector((state) => state.search.selectedSearchResult) || {};

  // const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShowSearchResults(searchString.length > 0);

    const timeout = setTimeout(() => {
      if (!searchString) return;
      dispatch(fetchPhotonSearchResults(searchString));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchString, dispatch]);

  const getTrailsParksAndWeatherDetails = async () => {
    if (!selectedSearchResult || Object.keys(selectedSearchResult).length === 0)
      return;

    setIsLoadingMobile(true);

    const {
      geometry: { coordinates },
    } = selectedSearchResult;
    const [lon, lat] = coordinates;

    if (!lat || !lon) {
      setIsLoadingMobile(false);
      return;
    }

    console.log("lat", lat);
    console.log("lon", lon);

    try {
      await Promise.all([
        dispatch(fetchTrails({ lat, lon, selectedSearch })),
        dispatch(fetchParks({ lat, lon, selectedSearch })),
        dispatch(fetchWeather({ lat, lon })),
        dispatch(fetchWeatherWeek({ lat, lon })),
      ]);
    } catch (error) {
      console.error(error);
    }

    setIsLoadingMobile(false);
  };

  useEffect(() => {
    const timeout = setTimeout(getTrailsParksAndWeatherDetails, 1000);
    // const timeout = setTimeout(() => {
    //   console.log("selectedSearchResult", selectedSearchResult);
    // }, 1000);

    return () => clearTimeout(timeout);
  }, [selectedSearch, selectedSearchResult, dispatch]);

  const handleSearchResultClick = (result, index) => {
    const {
      properties: { name, osm_id },
    } = result;

    setSelectedSearch(name);
    setSearchString(name);
    setShowSearchResults(false);
    dispatch(setSelectedSearchResult(result));
    dispatch(clearSearchResults());

    if (onSelect) {
      onSelect(result);
    }
  };

  return Platform.OS === 'web' ? (
    <VStack my="4" space={5} w="100%" maxW="300px">
<<<<<<< HEAD
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyBTuWUrM5WaEzMZLq_9ps6ii4xwmWBlmJk',
          language: 'en', // language of the results
        }}
        minLength={2}
        styles={{
          textInput: {
            borderColor: '#9ca3af',
            borderWidth: 1,
            paddingVertical: 3,
            paddingHorizontal: 6,
            borderRadius: 4,
            fontSize: 14,
          },

          predefinedPlacesDescription: {
            color: '#1faadb',
            zIndex: 100,
          },
        }}
        onPress={(data, details = null) => setSearchString(data?.description)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'all',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
=======
      {/* ... */}
      <VStack w="100%" space={5} alignSelf="center">
        <Box position="relative" height="auto">
          <Input
            onChangeText={(text) => setSearchString(text)}
            placeholder={placeholder ?? "Search"}
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            value={searchString}
            fontSize="14"
            backgroundColor={"white"}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              showSearchResults && (
                <IconButton
                  mr={2}
                  icon={
                    <Icon
                      as={<MaterialIcons name="close" />}
                      m="0"
                      size="4"
                      color="gray.400"
                    />
                  }
                  onPress={() => {
                    setShowSearchResults(false);
                    setSearchString("");
                  }}
                />
              )
            }
          />
          <View style={{ position: "relative" }}>
            {showSearchResults && searchResults?.length > 0 && (
              <ScrollView
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
                      underlayColor="gray.100"
                    >
                      <HStack space={3}>
                        <Text fontSize="sm" fontWeight="medium">
                          {result.properties.name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          textTransform={"capitalize"}
                        >
                          {result.properties.osm_value}
                        </Text>
                      </HStack>
                    </Pressable>
                  ))}
                </List>
              </ScrollView>
            )}
          </View>
        </Box>
      </VStack>
>>>>>>> f2fc0eb8af20a251efb67559880e245cf7d90cab
    </VStack>
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
        <ScrollView
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
                underlayColor="gray.100"
              >
                <HStack space={3}>
                  <Text fontSize="sm" fontWeight="medium">
                    {result.properties.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textTransform={"capitalize"}
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
