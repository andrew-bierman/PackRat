import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import WebMap from "./WebMap";

export function MapContainer({ cords }) {

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <WebMap cords={cords} />
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
    marginVertical: '10px',
    width: "100%",
    height: '400px',
    borderRadius: '10px',
  },
});
