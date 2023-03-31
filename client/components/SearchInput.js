import { StyleSheet } from "react-native";

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
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native";

import { Platform } from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { Google_Api_Key } from "../constants/api";
import { GOOGLE_PLACES_API_KEY } from "@env";

// redux
import { useDispatch } from "react-redux";
import { add, addWeek } from "../store/weatherStore";

import { useState, useEffect } from "react";

import { getGeoCode } from "../api/getGeoCode";
import { getWeather } from "../api/getWeather";
import { getWeatherWeek } from "../api/getWeatherWeek";

export const SearchInput = () => {
  const [searchString, setSearchString] = useState("Virginia US");
  const [geoCode, setGeoCode] = useState();
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);

  const dispatch = useDispatch();
  const lat = geoCode?.features[0]?.geometry?.coordinates[1];
  const lon = geoCode?.features[0]?.geometry?.coordinates[0];
  const state = geoCode?.features[0]?.properties.state;

  useEffect(() => {
    const getCode = async () => {
      setIsLoadingMobile(true);
      const code = await getGeoCode(searchString);
      setIsLoadingMobile(false);
      setGeoCode(code);
    };

    const timeout = setTimeout(async () => {
      getCode();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchString]);

  useEffect(() => {
    const getWeatherObject = async () => {
      const object = await getWeather(lat, lon, state);
      dispatch(add(object));
    };
    const getWeek = async () => {
      const weeekArray = await getWeatherWeek(lat, lon);
      dispatch(addWeek(weeekArray));
    };

    if (lat && lon) {
      getWeatherObject();
      getWeek();
    }
  }, [lat, lon, state]);

  return Platform.OS === "web" ? (
    <VStack my="4" space={5} w="100%" maxW="300px">
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        minLength={2}
        styles={{
          textInput: {
            borderColor: "#9ca3af",
            borderWidth: 1,
            paddingVertical: 3,
            paddingHorizontal: 6,
            borderRadius: 4,
            fontSize: 14,
          },

          predefinedPlacesDescription: {
            color: "#1faadb",
            zIndex: 100,
          },
        }}
        onPress={(data, details = null) => setSearchString(data?.description)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "all",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
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
    </VStack>
  );
};
