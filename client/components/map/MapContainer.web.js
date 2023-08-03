import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import WebMap from "./WebMap";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { defaultShape } from "../../utils/mapFunctions";

export function MapContainer({ shape,selectedSearchResult, type }) {
  // console.log("🚀 ~ file: MapContainer.web.js:10 ~ MapContainer ~ selectedSearchResult:", selectedSearchResult)

  if(isObjectEmpty(shape)){
    shape = defaultShape;
  }
  // console.log(isObjectEmpty(shape), 'shapr is empty')

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <WebMap shape={shape} selectedSearchResult={selectedSearchResult} type={type}  />
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
