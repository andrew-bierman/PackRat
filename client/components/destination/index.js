import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Container, Text } from "native-base";
import { useRouter, useSearchParams } from "expo-router";
import { theme } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../map/MapContainer";
import {
  defaultShape,
  convertPhotonGeoJsonToShape,
} from "../../utils/mapFunctions";
import TripCard from "../TripCard";
import LargeCard from "../card/LargeCard";
import WeatherCard from "../WeatherCard";
import { Ionicons } from "@expo/vector-icons";
import { processGeoJSON, getDestination } from "../../store/destinationStore";

export const DestinationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { destinationId } = useSearchParams();
  const status = useSelector((state) => state.destination.status);
  const currentDestination = useSelector((state) => state.search.selectedSearchResult);
  // const geoJSON = useSelector((state) => state.search.selectedSearchResult);
  const geoJSON = currentDestination
  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const weatherWeek = useSelector((state) => state.weather.weatherWeek);

  useEffect(() => {
    if (destinationId) {
      console.log("destinationId", destinationId);
      dispatch(getDestination(destinationId));
    }
  }, [destinationId]);

  if (!currentDestination) {
    return null;
  }

  let shape = convertPhotonGeoJsonToShape(geoJSON);

  const map = () => <MapContainer shape={shape} />;
  const weather = () => <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />;

  const {
    country = "N/A",
    state = "N/A",
    county = "N/A",
    name = "N/A",
  } = geoJSON?.properties || {};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {name !== "N/A" ? name : "Destination"}
        </Text>
        <Text style={styles.headerSubText}>
          {county !== "N/A" && `${county}, `}
          {state !== "N/A" && `${state}, `}
          {country !== "N/A" ? country : ""}
        </Text>
      </View>

      {/* Map Card */}
      <LargeCard
        title="Map"
        Icon={() => (
          <Ionicons
            name="location"
            size={24}
            color={theme.colors.textPrimary}
          />
        )}
        ContentComponent={map}
        contentProps={{ shape }}
        type="map"
      />
      {/* Weather Card */}
      <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: [0, 0, 12, 16],
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});
