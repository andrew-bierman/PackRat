import React from "react";
import { Box, VStack, Text, Image } from "native-base";
import LargeCard from "../card/LargeCard";
import { SearchInput } from "../SearchInput";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../hero";
import { useRouter } from "expo-router";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { processGeoJSON } from "../../store/destinationStore";

const HeroSection = ({ onSelect }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const currentDestination = useSelector(
    (state) => state.destination.currentDestination
  );

  console.log("currentDestination", currentDestination);

  const handleSearchSelect = (selectedResult) => {
    // console.log("-_-DASHBOARD Selected Result: ", selectedResult);
    // const osm_id = selectedResult.properties.osm_id;

    dispatch(processGeoJSON(selectedResult));
    
    // if(currentDestination){
      router.push(`/destination/${currentDestination._id}`);
    // }

    // router.push("/destination/" + osm_id);
  };

  const user = useSelector((state) => state.auth?.user);

  const { name } = user;
  const firstNameOrUser = name.split(" ")[0] ?? "User";

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
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: 20,
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
            <Text style={styles.title}>
              Let's find a new trail, {firstNameOrUser}
            </Text>
            <SearchInput onSelect={handleSearchSelect} />
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
