import React, { useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { Stack, Box, VStack, HStack, Button, View } from "native-base";
import { useSelector } from "react-redux";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

import { theme } from "../../theme";
import TripCard from "../TripCard";
import WeatherCard from "../WeatherCard";
import { GearList } from "../GearList";
import { MapContainer } from "../map/MapContainer";
import { CustomModal } from "../modal";
import { SaveTripContainer } from "./createTripModal";

import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

const swiperHeight = 1000; // Adjust this value according to your preference

export default function Trips() {
  const [parksData, setParksData] = useState();
  const [trails, setTrailsData] = useState();
  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const weatherWeek = useSelector((state) => state.weather.weatherWeek);

  const trailsObject = useSelector((state) => state.trails.trailNames);
  const parksObject = useSelector((state) => state.parks.parkNames);

  useEffect(() => {
    setTrailsData(trailsObject);
  }, [trailsObject]);

  useEffect(() => {
    setParksData(parksObject);
  }, [parksObject]);

  const [formData, setFormData] = useState({
    heading: "",
    trail: "",
    park: "",
  });

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    // Do any necessary validation here before moving to the next step
    // In this example, we're just moving to the next step directly.
    swiperRef.current.scrollBy(1);
  };

  const handlePreviousStep = () => {
    // Do any necessary validation here before moving to the previous step
    // In this example, we're just moving to the previous step directly.
    swiperRef.current.scrollBy(-1);
  };
  const swiperRef = React.useRef(null);

  return (
    <VStack style={styles.container}>
      {/* No Header element here */}

      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        scrollEnabled={false}
        style={[styles.swiperContainer, { height: swiperHeight }]}
      >
        {/* Step 1 */}
        <Box style={styles.stepContainer}>
          <TripCard
            title="Where are you heading?"
            isSearch={true}
            Icon={() => (
              <FontAwesome
                name="map"
                size={20}
                color={theme.colors.cardIconColor}
              />
            )}
            onChangeText={(value) => handleFormChange("heading", value)}
          />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 2 */}
        <Box style={styles.stepContainer}>
          <WeatherCard
            weatherObject={weatherObject}
            weatherWeek={weatherWeek}
            onWeatherChange={(value) => handleFormChange("weather", value)}
          />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
              startIcon={
                <EvilIcons name="chevron-left" size={24} color="white" />
              }
              style={{ marginHorizontal: 20 }}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 3 */}
        <Box style={styles.stepContainer}>
          <TripCard
            title="Nearby Trails"
            value="Trail List"
            isTrail={true}
            data={trails || []}
            Icon={() => (
              <FontAwesome5
                name="hiking"
                size={20}
                color={theme.colors.cardIconColor}
              />
            )}
            onChangeText={(value) => handleFormChange("trail", value)}
          />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
              startIcon={
                <EvilIcons name="chevron-left" size={24} color="white" />
              }
              style={{ marginHorizontal: 20 }}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 4 */}
        <Box style={styles.stepContainer}>
          <TripCard
            title="Nearby Parks"
            value="Parks List"
            data={parksData}
            Icon={() => (
              <FontAwesome5
                name="mountain"
                size={20}
                color={theme.colors.cardIconColor}
              />
            )}
            onChangeText={(value) => handleFormChange("park", value)}
          />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
              startIcon={
                <EvilIcons name="chevron-left" size={24} color="white" />
              }
              style={{ marginHorizontal: 20 }}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 5 */}
        <Box style={styles.stepContainer}>
          <GearList />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
              startIcon={
                <EvilIcons name="chevron-left" size={24} color="white" />
              }
              style={{ marginHorizontal: 20 }}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 6 */}
        <Box style={styles.mapStepContainer}>
          <TripCard
            Icon={() => (
              <FontAwesome5
                name="route"
                size={24}
                color={theme.colors.cardIconColor}
              />
            )}
            title="Map"
            isMap={true}
          />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
            style={{ paddingBottom: 100 }}
          >
            <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
              startIcon={
                <EvilIcons name="chevron-left" size={24} color="white" />
              }
              style={{ marginHorizontal: 20 }}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              endIcon={
                <EvilIcons name="chevron-right" size={24} color="white" />
              }
            >
              Next
            </Button>
          </View>
        </Box>

        {/* Step 7 */}
        <Box style={styles.stepContainer}>
          <Box>
            <SaveTripContainer formData={formData} />
          </Box>
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            px={4}
          >
            {/* <Button
              onPress={handlePreviousStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 0}
            >
              Previous
            </Button>
            <Button
              onPress={handleNextStep}
              colorScheme="primary"
              isDisabled={swiperRef.current && swiperRef.current.index === 6}
              style={{ marginHorizontal: 30 }}
            >
              Next
            </Button> */}
          </View>
        </Box>
      </Swiper>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    padding: 100,
  },
  swiperContainer: {},
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    marginTop: 100,
  },
  mapStepContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 1000,
  },
});
