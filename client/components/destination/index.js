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
import {
  processGeoJSON,
  getDestination,
  photonDetails,
} from "../../store/destinationStore";

export const DestinationPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { destinationId, id, type } = useSearchParams();
  const status = useSelector((state) => state.destination.status);
  // const currentDestination = useSelector(
  //   (state) => state.destination.currentDestination
  // );

  const photonDetailsStore = useSelector(
    (state) => state.destination.photonDetails
  );
  const currentDestination = {
    geoJSON: photonDetailsStore,
  };

  // const geoJSON = useSelector((state) => state.search.selectedSearchResult);
  const geoJSON = currentDestination?.geoJSON;
  const selectedSearchResult = useSelector(
    (state) => state.destination.selectedSearchResult
  );

  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const weatherWeek = useSelector((state) => state.weather.weatherWeek);

  useEffect(() => {
    if (destinationId) {
      console.log("destinationId", destinationId);
      console.log("id", id);
      console.log("type", type);

      if (type && id) {
        const matchPhotonFormattingForData = {
          properties: {
            osm_id: id,
            osm_type: type,
          },
        };

        // Fetch full details of the selected result from the Overpass API
        dispatch(photonDetails(matchPhotonFormattingForData));
      } else if (destinationId && !type && !id && destinationId !== "query") {
        dispatch(getDestination(destinationId));
      }
    }
  }, [destinationId]);

  if (!currentDestination) {
    return null;
  }

  console.log("geoJSON ---->", geoJSON);

  // let shape = convertPhotonGeoJsonToShape(geoJSON);
  let shape = geoJSON ?? defaultShape;

  const map = () => <MapContainer shape={shape} />;
  const weather = () => (
    <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
  );

  const properties = {
    ...geoJSON?.features[0]?.properties,
    ...selectedSearchResult?.properties,
  };

  const { country = "N/A", state = "N/A", county = "N/A", name = "N/A" } =
    // geoJSON?.features[0]?.properties || {};
    // selectedSearchResult?.properties || {};
    properties;

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
