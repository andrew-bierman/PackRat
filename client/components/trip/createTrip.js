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
        </Box>

        {/* Step 2 */}
        <Box style={styles.stepContainer}>
          <WeatherCard
            weatherObject={weatherObject}
            weatherWeek={weatherWeek}
            onWeatherChange={(value) => handleFormChange("weather", value)}
          />
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
        </Box>

        {/* Step 5 */}
        <Box style={styles.stepContainer}>
          <GearList />
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
        </Box>

        {/* Step 7 */}
        <Box style={styles.stepContainer}>
          <Box>
            <SaveTripContainer formData={formData} />
          </Box>
        </Box>
      </Swiper>
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
        >
          Previous
        </Button>
        <Button
          onPress={handleNextStep}
          colorScheme="primary"
          isDisabled={swiperRef.current && swiperRef.current.index === 6}
        >
          Next
        </Button>
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
  },
  swiperContainer: {},
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  mapStepContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 1000,
  },
});
