import React from "react";
import { View } from "react-native";
import MapboxGL from "@rnmapbox/maps";

// var __html = require('./template.html');
// var template = { __html: __html };

import { MAPBOX_ACCESS_TOKEN } from "@env";

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

console.log(MapboxGL)

export const MapContainer = () => {
  return (
    <View>
      <MapboxGL.MapView
        styleURL='mapbox://styles/mapbox/satellite-v9'
        zoomLevel={16}
        centerCoordinate={[3.3362400, 6.5790100]}
        showUserLocation={true}
        style={{ flex: 1 }}
      >
      </MapboxGL.MapView>
    </View >
  );
};

