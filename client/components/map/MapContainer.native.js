import React from "react";

import { View, StyleSheet, Platform } from "react-native";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { defaultShape } from "../../utils/mapFunctions";

import NativeMap from "./NativeMap";

export function MapContainer({ shape,selectedSearchResult, type  }) {
  if (isObjectEmpty(shape)) {
    shape = defaultShape;
  }

  if (Platform.OS === "android" || Platform.OS === "ios") {
    return (
      <View style={[styles.nativeContainer]}>
        <NativeMap shape={shape} />
      </View>
    );
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
