import Footer from "../../components/footer/Footer";
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

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { GearList } from "../GearList";

import { MapContainer } from "../map/MapContainer";

import { CustomModal } from "../modal";
import { SaveTripContainer } from "./createTripModal";
import UseTheme from "../../hooks/useTheme";
export default function Trips() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
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
          <TripCard
            title="Where are you heading?"
            isSearch={true}
            Icon={() => (
              <FontAwesome
                name="map"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />

          <WeatherCard
            weatherObject={weatherObject}
            weatherWeek={weatherWeek}
          />

          <TripCard
            title="Nearby Trails"
            value="Trail List"
            isTrail={true}
            data={trails || []}
            Icon={() => (
              <FontAwesome5
                name="hiking"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />

          <TripCard
            title="Nearby Parks"
            value="Parks List"
            data={parksData}
            Icon={() => (
              <FontAwesome5
                name="mountain"
                size={20}
                color={currentTheme.colors.cardIconColor}
              />
            )}
          />
          <GearList />

          <TripCard
            Icon={() => (
              <FontAwesome5
                name="route"
                size={24}
                color={currentTheme.colors.cardIconColor}
              />
            )}
            title="Map"
            isMap={true}
          />
          <Box>
            <SaveTripContainer />
          </Box>
        </Stack>
      </Box>

      {/* <Footer /> */}
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
