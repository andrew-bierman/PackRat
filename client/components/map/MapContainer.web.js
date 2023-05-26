import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import WebMap from "./WebMap";

export function MapContainer() {
  if (Platform.OS === "web") {
    return (
      <View style={[styles.webContainer]}>
        <WebMap />
      </View>
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
    border: "1px solid red",
    width: "400px",
    height: '100%',
  },
});
