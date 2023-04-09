import React, { useEffect, useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, Picker } from "react-native";

// import Mapbox from '@rnmapbox/maps';
import { Select, Center, Box, CheckIcon } from "native-base";

// import { MapboxWeb, MapboxNative } from "./Mapbox";
import { Mapbox } from "./Mapbox";



export function MapContainer() {

  return (
    <View style={styles.container}>

      <Text>Mapbox</Text>
      {Platform.OS === 'web' ?
        // <MapboxWeb />
        <View >
          <Text>Mapbox maps are not supported on web yet.</Text>
        </View>
        :
        // <MapboxNative />
        <Mapbox />
      }

    </View>
  );

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 500,
    width: '100%',
    backgroundColor: "tomato",
    marginBottom: 20
  },
  map: {
    flex: 1
  },
  lineLayer: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
});
