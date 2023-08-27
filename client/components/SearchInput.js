
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
  HStack,
  List,
  View,
  Pressable,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native";

import { Platform } from "react-native";

// redux
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

// import { getTrailsResult } from "../api/getTrailsResult";
// import { getPhotonResults } from "../api/getPhotonResults";

import {
  fetchTrails,
} from "../store/trailsStore";

import { fetchParks } from "../store/parksStore";

import {
  setSelectedSearchResult,
  clearSearchResults,
  fetchPhotonSearchResults,
} from "../store/searchStore";
import { getTrailsOSM } from "../api/getTrails";
import { getParksOSM } from "../api/getParks";
import { fetchWeather, fetchWeatherWeek } from "../store/weatherStore";

export const SearchInput = ({ onSelect, placeholder }) => {
  const [searchString, setSearchString] = useState("");
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

  /**
   * Retrieves trails, parks, and weather details based on the selected search result.
   *
   * @return {Promise<void>} - A promise that resolves when all data is successfully fetched.
   */
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

  /**
   * Handles the click event on a search result.
   *
   * @param {object} result - The search result object.
   * @param {number} index - The index of the search result.
   * @return {undefined} This function does not return anything.
   */
  const handleSearchResultClick = (result, index) => {
    const {
      properties: { name, osm_id },
    } = result;

    setSelectedSearch(name);
    setSearchString(name);
    setShowSearchResults(false);
    dispatch(setSelectedSearchResult(result));
    // dispatch(clearSearchResults());

    if (onSelect) {
      onSelect(result);
    }
  };

  return Platform.OS === "web" ? (
    <VStack my="4" space={5} w="100%" maxW="300px">
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
