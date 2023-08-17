import React from "react";

import { View, StyleSheet, Platform } from "react-native";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { defaultShape } from "../../utils/mapFunctions";
import UseTheme from '../../hooks/useTheme';
import NativeMap from "./NativeMap";

export function MapContainer({ shape }) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  if (isObjectEmpty(shape)) {
    shape = defaultShape;
  }

  if (Platform.OS === "android" || Platform.OS === "ios") {
    return (
      <View style={[styles.nativeContainer,{ backgroundColor:currentTheme.colors.white}]}>
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
    marginBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});
