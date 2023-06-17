import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import WebMap from "./WebMap";

export function MapContainer({ cords }) {

  if (Platform.OS === "web") {
    return (
      // <View style={{
      //   alignItems: "center",
      //   justifyContent: "center",
      //   overflow: "hidden",
      //   marginVertical: '10px',
      //   width: "100%",
      //   height: '400px',
      //   borderRadius: '10px',
      // }}>
        <WebMap cords={cords} />
      // </View>
    );
  }
}

export default MapContainer;

const styles = StyleSheet.create({
  webContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: '10px',
    // height: "fit-content",
    // position: "relative",

    width: "600px",
    height: '400px',
    borderRadius: '10px',
  },
});
