import CreateTrip from "../../components/trip/createTrip";

import { Platform } from "react-native";
import { Stack as Header } from "expo-router";
import Itinerary from "../../components/trip/itineraryTrip";

export default function Trip() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Create Trip",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <CreateTrip />
      {/* <Itinerary/> */}
    </>
  ) : (
    <CreateTrip />
  );
}
