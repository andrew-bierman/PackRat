import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Text,
  ScrollView,
  Button,
  Input,
  HStack,
  VStack,
} from "native-base";
import { Stack as Header } from "expo-router";

import { theme } from "../../theme";
import TripCard from "../TripCard";
import WeatherCard from "../WeatherCard";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

import { GearList } from "../GearList";

import { MapContainer } from "../map/MapContainer";

import { CustomModal } from "../modal";
import { SaveTripContainer } from "./createTripModal";

// Step 1: Create a component for each step of the form

// Step 1: TripCard Step
const TripCardStep = () => (
  <TripCard
    title="Where are you heading?"
    isSearch={true}
    Icon={() => (
      <FontAwesome name="map" size={20} color={theme.colors.cardIconColor} />
    )}
  />
);

// Step 2: WeatherCard Step
const WeatherCardStep = ({ weatherObject, weatherWeek }) => (
  <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
);

// Step 3: Nearby Trails Step
const NearbyTrailsStep = ({ trails }) => (
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
  />
);

// Step 4: Nearby Parks Step
const NearbyParksStep = ({ parksData }) => (
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
  />
);

// Step 5: Gear List Step
const GearListStep = () => <GearList />;

// Step 6: Map Step
const MapStep = () => (
  <TripCard
    Icon={() => (
      <FontAwesome5 name="route" size={24} color={theme.colors.cardIconColor} />
    )}
    title="Map"
    isMap={true}
  />
);

// Step 7: Save Trip Step
const SaveTripStep = () => <SaveTripContainer />;

export default function Trips() {
  const [currentStep, setCurrentStep] = useState(0);
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

  // Function to handle the next step
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to handle the previous step
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Function to render the current step based on the currentStep state
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <TripCardStep />;
      case 1:
        return (
          <WeatherCardStep
            weatherObject={weatherObject}
            weatherWeek={weatherWeek}
          />
        );
      case 2:
        return <NearbyTrailsStep trails={trails} />;
      case 3:
        return <NearbyParksStep parksData={parksData} />;
      case 4:
        return <GearListStep />;
      case 5:
        return <MapStep />;
      case 6:
        return <SaveTripStep />;
      default:
        return null;
    }
  };

  return (
    <VStack>
      {Platform.OS === "web" ? (
        <Header.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: "Home",
          }}
        />
      ) : null}
      <Box style={styles.mutualStyles}>
        <Stack m={[0, 0, 12, 16]} style={{ gap: 25 }}>
          {renderCurrentStep()}

          {/* Step Navigation Buttons */}
          <HStack justifyContent="space-between">
            {currentStep > 0 && (
              <Button onPress={handlePreviousStep}>Previous</Button>
            )}
            {currentStep < 6 && <Button onPress={handleNextStep}>Next</Button>}
          </HStack>
        </Stack>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
});
