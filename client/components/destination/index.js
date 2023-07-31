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
  setSelectedSearchResult,
  setWeatherObject,
  setWeatherWeek,
} from "../../store/destinationStore";
import { fetchWeather, fetchWeatherWeek } from "../../store/weatherStore";

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

  // const weatherObject = useSelector((state) => state.weather.weatherObject);
  // const weatherWeek = useSelector((state) => state.weather.weatherWeek);
  const weatherObject = useSelector((state) => state.destination.weatherObject);
  const weatherWeek = useSelector((state) => state.destination.weatherWeek);

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

  useEffect(() => {
    if (geoJSON && geoJSON.features) {
      const { coordinates } = geoJSON.features[0].geometry;
      const [lon, lat] = coordinates;

      console.log("lat", lat);

      if (lat && lon) {
        (async () => {
          await dispatch(fetchWeather({ lat, lon }))
            .then((res) => {
              const payload = res.payload;
              dispatch(setWeatherObject(payload));
            })
            .catch((err) => console.error(err));

          await dispatch(fetchWeatherWeek({ lat, lon }))
            .then((res) => {
              const payload = res.payload;
              const week = payload.list.slice(0, 4);
              dispatch(setWeatherWeek(week));
            })
            .catch((err) => console.error(err));
        })();
      }
    }
  }, [geoJSON]);

  if (!currentDestination) {
    return null;
  }

  console.log("geoJSON ---->", geoJSON);

  // let shape = convertPhotonGeoJsonToShape(geoJSON);
  let shape = geoJSON ?? defaultShape;

  const map = () => <MapContainer shape={shape} />;
  const weather = () =>
    weatherObject &&
    weatherWeek && (
      <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
    );

  const properties = {
    ...geoJSON?.features[0]?.properties,
    ...selectedSearchResult?.properties,
  };

  let {
    country = "N/A",
    "is_in:country": is_in_country,
    "is_in:country_code": is_in_country_code,
    state = "N/A",
    "is_in:state": is_in_state,
    place = "N/A",
    county = "N/A",
    name = "N/A",
  } = properties;

  country = is_in_country || country;
  state = is_in_state || state;

  const languageNames = Object.keys(properties).reduce((result, key) => {
    if (key.startsWith("name:")) {
      result[key] = properties[key];
    }
    return result;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {name !== "N/A" ? name : "Destination"}
        </Text>
        <View style={styles.languageContainer}>
          {Object.entries(languageNames).map(([key, value]) => (
            <Text key={key} style={styles.languageText}>
              {`${key.split(":")[1].toUpperCase()}: ${value}`}
            </Text>
          ))}
        </View>
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
      {/* <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} /> */}
      {weather()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // changed from 'center' to align content to the top
    padding: 20,
    paddingBottom: 12,
    paddingLeft: 16,
    width: "100%",
    backgroundColor: theme.colors.background, // if you have a background color in your theme
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
    marginTop: 5, // added a margin for better visual separation
  },
  languageContainer: {
    flexDirection: "row", // to display languages in a line
    flexWrap: "wrap", // if there are many languages, start a new line
    marginTop: 10, // added a margin for better visual separation
  },
  languageText: {
    color: theme.colors.white,
    fontSize: 14, // smaller font size for languages
    marginRight: 10, // spacing between languages
  },
});
