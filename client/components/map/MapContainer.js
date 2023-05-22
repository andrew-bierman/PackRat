import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import { CustomizedMap } from "./NativeMap";

import WebPackContainer from "./WebMapcontainer";

export function MapContainer() {
  if (Platform.OS === "web") {
    return (
      <View style={[styles.webContainer]}>
        <WebPackContainer />
      </View>
    );
  }

  if(Platform.OS === "android" || Platform.OS === "ios"){
    <View style={[styles.nativeContainer]}>
      <CustomizedMap />
    </View>
  }
}

export default MapContainer;

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // overflow: "hidden",
    height: "fit-content",
  },
  nativeContainer: {
    // height: 500,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});
