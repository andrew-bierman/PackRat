import {
  Stack,
  Box,
  VStack,
} from "native-base";
import { ScrollView } from 'react-native'
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

import { SaveTripContainer } from "./createTripModal";
import TripDateRange from "./TripDateRange";
import MultiStepForm from "../multi_step";
import UseTheme from "../../hooks/useTheme";
export default function Trips() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const [parksData, setParksData] = useState();
  const [trails, setTrailsData] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
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

  const steps = [
    {
      name: "Step 1",
      component: () => (
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
        />
      ),
      sidebarData: {
        title: "Where are you heading?",
        Icon: () => (
          <FontAwesome
            name="map"
            size={20}
            color={theme.colors.cardIconColor}
          />
        ),
      },
    },
    {
      name: "Step 2",
      component: () => (
        <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
      ),
    },
    {
      name: "Step 3",
      component: () => (
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
      ),
    },
    {
      name: "Step 4",
      component: () => (
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
      ),
    },
    {
      name: "Step 5",
      component: GearList,
    },
    {
      name: "Step 6",
      component: () => (
        <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
      ),
    },
    {
      name: "Step 7",
      component: () => (
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
      ),
    },
    {
      name: "Step 8",
      component: () => <SaveTripContainer dateRange={dateRange} />,
    },
  ];

  return (
    <ScrollView
      nestedScrollEnabled={true}>
    <VStack>
      {/* <MultiStepForm steps={steps} /> */}
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
            isPark={true}
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
          <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />

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
            <SaveTripContainer dateRange={dateRange} />
          </Box>
        </Stack>
      </Box>

      {/* <Footer /> */}
    </VStack>
    </ScrollView>
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
