import React from "react";
import { Box, VStack, Text, Image } from "native-base";
import LargeCard from "../card/LargeCard";
import { SearchInput } from "../SearchInput";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../hero";
import { useRouter } from "expo-router";
import {
  photonDetails,
  processGeoJSON,
  setSelectedSearchResult,
} from "../../store/destinationStore";
import { hexToRGBA } from "../../utils/colorFunctions";

const HeroSection = ({ onSelect }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const currentDestination = useSelector(
    (state) => state.destination.currentDestination,
  );
  console.log("currentDestination", currentDestination);

  const handleSearchSelect = async (selectedResult) => {
    try {
      console.log("selectedResult ------->", selectedResult);

      // Set the selected search result in the Redux store
      dispatch(setSelectedSearchResult(selectedResult));

      const { osm_id, osm_type } = selectedResult.properties;

      if (!osm_id || !osm_type) {
        console.error(
          "No OSM ID or OSM type found in the selected search result",
        );
        return;
      } else {
        router.push({
          pathname: `/destination/query`,
          params: {
            type: osm_type,
            id: osm_id,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const user = useSelector((state) => state.auth?.user);

  const { name } = user;
  const firstNameOrUser = name.split(" ")[0] ?? "User";

  const cardBackgroundColor = hexToRGBA(theme.colors.secondaryBlue, 0.5);

  const bannerText =
    firstNameOrUser !== "User"
      ? `Let's find a new trail, ${firstNameOrUser}`
      : "Let's find a new trail";

  // console.log("cardBackgroundColor", cardBackgroundColor)

  return (
    <View style={styles.banner}>
      <Hero
        imageDetails={{
          title: "N/A",
          subtitle: "N/A",
          source: require("../../assets/topographical-pattern.png"),
          alt: "hero",
        }}
      >
        <LargeCard
          customStyle={{
            backgroundColor: cardBackgroundColor || theme.colors.secondaryBlue,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: 50,
          }}
        >
          <VStack
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>{bannerText}</Text>
            <SearchInput
              onSelect={handleSearchSelect}
              placeholder={"Search by park, city, or trail"}
            />
          </VStack>
        </LargeCard>
      </Hero>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
    // overflow: "hidden",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.text,
  },
});

export default HeroSection;
